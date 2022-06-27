import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ARedshiftObjectConnector from './ARedshiftObjectConnector';
import RedshiftApplication from '../RedshiftApplication';
import { QUERY } from '../../AAwsObjectConnector';

export default class RedshiftExecuteQueryConnector extends ARedshiftObjectConnector {
  protected _getCustomId = (): string => 'query';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const content = dto.jsonData as { query: string };
    this._checkParameters([QUERY], content);

    const applicationInstall = await this._getApplicationInstall();
    const application = this._application as RedshiftApplication;
    const connection = await application.getConnection(applicationInstall);
    dto.jsonData = connection.query(content[QUERY]);

    return dto;
  }
}
