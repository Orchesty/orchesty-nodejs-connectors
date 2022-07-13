import ACommonNode from '@orchesty/nodejs-sdk/dist/lib/Commons/ACommonNode';
import { ConnectionError, Sequelize } from 'sequelize';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import OracleDB, { ExecuteOptions } from 'oracledb';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import SqlErrorEnum from '../Enums/SqlErrorEnum';
import ASqlApplication from './ASqlApplication';

export default abstract class ASqlNode extends ACommonNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown, dto: AProcessDto): Promise<AProcessDto> | AProcessDto;

  protected abstract _getQuery(processDto: AProcessDto): Promise<string> | string;

  protected _getExecuteOptions = (): ExecuteOptions => ({ outFormat: OracleDB.OUT_FORMAT_OBJECT });

  protected async _processAction(_dto: AProcessDto): Promise<AProcessDto> {
    const dto = _dto;
    const query = await this._getQuery(dto);
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const app = this._application as ASqlApplication;
    let conn: Sequelize | OracleDB.Connection | undefined;
    try {
      conn = await (app.getConnection(appInstall));
      if (conn instanceof Sequelize) {
        const result = await conn.query(query);
        return this._processResult({ rows: result[0] }, dto);
      }

      return this._processResult(await conn.execute(query, [], this._getExecuteOptions()), dto);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e instanceof ConnectionError) {
        logger.error(e.message, dto);
        switch (e.message) {
          case SqlErrorEnum.TOO_MANY_CONNECTIONS:
            throw new OnRepeatException(60, 10, e.message);
          default:
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
            break;
        }
      } else {
        logger.error(e?.message, dto);
        dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
      }

      return dto;
    } finally {
      if (conn && !(conn instanceof Sequelize)) {
        try {
          await conn.close();
        } catch (e) {
          if (e instanceof Error) {
            logger.error(e.message, dto);
          }
        }
      }
    }
  }
}
