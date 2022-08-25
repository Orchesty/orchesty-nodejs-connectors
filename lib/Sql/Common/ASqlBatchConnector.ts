import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import OracleDB, { ExecuteOptions } from 'oracledb';
import ASqlNode from './ASqlNode';

export const NAME = 'sql-batch-connector';

export default abstract class ASqlBatchConnector extends ASqlNode {

    protected abstract name: string;

    protected abstract processResult(res: unknown, dto: BatchProcessDto): BatchProcessDto | Promise<BatchProcessDto>;

    protected abstract getQuery(processDto: BatchProcessDto): Promise<string> | string;

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        return await super.processAction(dto) as BatchProcessDto;
    }

    public getName(): string {
        return `${this.name}-${NAME}`;
    }

    protected getExecuteOptions(): ExecuteOptions {
        return { outFormat: OracleDB.OUT_FORMAT_OBJECT };
    }

}
