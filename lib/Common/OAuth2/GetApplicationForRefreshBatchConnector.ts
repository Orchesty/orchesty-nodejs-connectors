import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';

export const NAME = 'get-application-for-refresh';

export default class GetApplicationForRefreshBatchConnector extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const date = DateTimeUtils.getUtcDate();
        date.setMinutes(date.getMinutes() + 5);

        const repository = await this.getDbClient().getApplicationRepository();

        const applications = await repository.findMany({ expires: { $lte: date } });
        applications.forEach((app) => {
            dto.addItem({}, app.getUser());
        });

        return dto;
    }

}
