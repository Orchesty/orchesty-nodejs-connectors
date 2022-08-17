import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import OracleDB, { ExecuteOptions } from 'oracledb';
import ASqlNode from './ASqlNode';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ASqlNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown, dto: ProcessDto): Promise<ProcessDto> | ProcessDto;

  protected abstract _getQuery(processDto: ProcessDto): Promise<string> | string;

  protected _getExecuteOptions = (): ExecuteOptions => ({ outFormat: OracleDB.OUT_FORMAT_OBJECT });

  public async processAction(_dto: AProcessDto): Promise<AProcessDto> {
    return super._processAction(_dto);
  }

  public getName(): string {
    return `${this._name}-${NAME}`;
  }
}
