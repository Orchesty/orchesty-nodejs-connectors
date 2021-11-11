import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import DateTimeUtils from 'pipes-nodejs-sdk/dist/lib/Utils/DateTimeUtils';

export const APPLICATION_ID = 'get-application-for-refresh';

export default class GetApplicationForRefreshBatchConnector extends AConnector {
  public getName = (): string => APPLICATION_ID;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const date = DateTimeUtils.utcDate;
    const time = date.setHours(date.getHours() + 1);

    const repository = await this._dbClient.getApplicationRepository();

    const applications = repository.find({ expires: { $in: [{ $lte: time }, { $ne: null }] } });

    dto.jsonData = applications.map((app) => ({
      applicationId: app.getId(),
    }));

    return dto;
  }
}
