import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ARedshiftObjectConnector from './ARedshiftObjectConnector';
import RedshiftApplication from '../RedshiftApplication';

export default class RedshiftExecuteQueryConnector extends ARedshiftObjectConnector {
  protected _getCustomId = (): string => 'query';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = dto.jsonData as any;
    this._checkParameters([this._QUERY], content);

    const applicationInstall = await this._getApplicationInstall();
    const application = this._application as RedshiftApplication;
    const connection = await application.getConnection(applicationInstall);
    let result: string;
    try {
      result = connection.query(content[this._QUERY]);
    } catch (e) {
      throw Error(e);
    }

    dto.jsonData = result;

    return dto;
  }
}
