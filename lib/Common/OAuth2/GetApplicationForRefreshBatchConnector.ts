import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';

export const NAME = 'get-application-for-refresh';

export default class GetApplicationForRefreshBatchConnector extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto<IOutput>> {
        const date = DateTimeUtils.getUtcDate();
        date.setMinutes(date.getMinutes() + 5);

        const repository = this.getDbClient().getApplicationRepository();

        const applications = await repository.findMany({ expires: date.getTime(), enabled: true });
        applications.forEach((app) => {
            dto.addItem({ app: app.getName() }, app.getUser());
        });

        return dto as BatchProcessDto<IOutput>;
    }

}

export interface IOutput {
    app: string;
}
