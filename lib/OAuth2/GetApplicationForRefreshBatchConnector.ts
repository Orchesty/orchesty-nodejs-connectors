import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';

export const APPLICATION_ID = 'get-application-for-refresh';

export default class GetApplicationForRefreshBatchConnector extends ABatchNode {

    public getName(): string {
        return APPLICATION_ID;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const date = DateTimeUtils.getUtcDate();
        const time = date.setHours(date.getHours() + 1);

        const repository = await this.getDbClient().getApplicationRepository();

        const applications = repository.find({ expires: { $in: [{ $lte: time }, { $ne: null }] } });
        await applications.forEach((app) => {
            dto.addItem({}, app.getUser());
        });

        return dto;
    }

}
