import ANode from '@orchesty/nodejs-sdk/dist/lib/Commons/ANode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import OracleDB, { ExecuteOptions } from 'oracledb';
import { ConnectionError, Sequelize } from 'sequelize';
import SqlErrorEnum from '../Enums/SqlErrorEnum';
import ASqlApplication from './ASqlApplication';

export default abstract class ASqlNode extends ANode {

    protected abstract name: string;

    protected abstract processResult(res: unknown, dto: AProcessDto): AProcessDto | Promise<AProcessDto>;

    protected abstract getQuery(processDto: AProcessDto): Promise<string> | string;

    public async processAction(dto: AProcessDto): Promise<AProcessDto> {
        const query = await this.getQuery(dto);
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<ASqlApplication>();
        let conn: OracleDB.Connection | Sequelize | undefined;
        try {
            conn = await app.getConnection(appInstall);
            if (conn instanceof Sequelize) {
                const result = await conn.query(query);
                return await this.processResult({ rows: result[0] }, dto);
            }

            return await this.processResult(await conn.execute(query, [], this.getExecuteOptions()), dto);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (e instanceof ConnectionError) {
                logger.error(e.message, dto, false, e);
                switch (e.message) {
                    case SqlErrorEnum.TOO_MANY_CONNECTIONS:
                        throw new OnRepeatException(60, 10, e.message);
                    default:
                        dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
                        break;
                }
            } else {
                logger.error(e?.message, dto, false, e);
                dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
            }

            return dto;
        } finally {
            if (conn && !(conn instanceof Sequelize)) {
                try {
                    await conn.close();
                } catch (e) {
                    if (e instanceof Error) {
                        logger.error(e.message, dto, false, e);
                    }
                }
            }
        }
    }

    protected getExecuteOptions(): ExecuteOptions {
        return { outFormat: OracleDB.OUT_FORMAT_OBJECT };
    }

}
