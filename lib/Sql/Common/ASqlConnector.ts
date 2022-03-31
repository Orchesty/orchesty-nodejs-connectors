import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';
import ASqlApplication from './ASqlApplication';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ACommonNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown): Promise<ProcessDto> | ProcessDto;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const query = this._getQuery(dto);
    const { userName } = dto.jsonData as { userName: string };
    const appInstall = await this._getApplicationInstall(userName);
    const app = this._application as ASqlApplication;
    const result = app.getConnection(appInstall).query(query);
    return this._processResult(result);
  }

  protected abstract _getQuery(processDto: ProcessDto): string;

  public getName(): string {
    return `${this._name}-${NAME}`;
  }
}
