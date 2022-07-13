import OracleDB, { ExecuteOptions } from 'oracledb';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ASqlNode from './ASqlNode';

export const NAME = 'sql-batch-connector';

export default abstract class ASqlBatchConnector extends ASqlNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown, dto: BatchProcessDto): Promise<BatchProcessDto> | BatchProcessDto;

  protected abstract _getQuery(processDto: BatchProcessDto): Promise<string> | string;

  protected _getExecuteOptions = (): ExecuteOptions => ({ outFormat: OracleDB.OUT_FORMAT_OBJECT });

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    return await super._processAction(_dto) as BatchProcessDto;
  }

  public getName(): string {
    return `${this._name}-${NAME}`;
  }
}
