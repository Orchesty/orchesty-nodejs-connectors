import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import OracleDB, { ExecuteOptions } from 'oracledb';
import ASqlNode from './ASqlNode';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ASqlNode {

    protected abstract name: string;

    protected abstract processResult(res: unknown, dto: ProcessDto): ProcessDto | Promise<ProcessDto>;

    protected abstract getQuery(processDto: ProcessDto): Promise<string> | string;

    public async processAction(dto: AProcessDto): Promise<AProcessDto> {
        return super.processAction(dto);
    }

    public getName(): string {
        return `${this.name}-${NAME}`;
    }

    protected getExecuteOptions(): ExecuteOptions {
        return { outFormat: OracleDB.OUT_FORMAT_OBJECT };
    }

}
