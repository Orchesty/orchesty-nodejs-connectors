import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';
import { IDialect } from './ASqlApplication';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ACommonNode {
  constructor(private _dialect: IDialect) {
    super();
  }

  public getName = (): string => `${this._dialect}-${NAME}`;

  protected abstract _processResult(res: unknown): Promise<ProcessDto> | ProcessDto;

  protected abstract _getQuery(): string;
}
