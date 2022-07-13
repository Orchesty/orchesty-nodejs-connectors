import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const APPLICATION_ID = 'get-application-for-refresh';

export default class GetApplicationForRefreshBatchConnector extends ABatchNode {
  public getName = (): string => APPLICATION_ID;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const date = DateTimeUtils.utcDate;
    const time = date.setHours(date.getHours() + 1);

    const repository = await this._dbClient.getApplicationRepository();

    const applications = await repository.find({ expires: { $in: [{ $lte: time }, { $ne: null }] } });
    await applications.forEach((app) => {
      dto.addItem({}, app.getUser());
    });

    return dto;
  }
}
