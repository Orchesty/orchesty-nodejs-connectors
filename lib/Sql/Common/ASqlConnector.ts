import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ACommonNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown): Promise<ProcessDto> | ProcessDto;

  protected abstract _getQuery(): string;

  public getName(): string {
    return `${this._name}-${NAME}`;
  }
}
