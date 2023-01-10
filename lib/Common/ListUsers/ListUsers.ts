import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export default class ListUsers extends ABatchNode {

    public getName(): string {
        return `${this.getApplication().getName()}-list-users`;
    }

    public async processAction(_dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const userHeader = _dto.getUser();
        const { user, ...rest } = _dto.getJsonData();
        let dto;
        if (!userHeader) {
            dto = await this.getUsers(_dto, rest);
        } else {
            dto = await this.getUser(_dto, user, rest);
        }

        return dto;
    }

    protected async getUsers(dto: BatchProcessDto, body: unknown): Promise<BatchProcessDto> {
        const repo = await this.getDbClient().getApplicationRepository();
        const appInstalls = await repo.findMany(
            {
                key: this.getApplication().getName(),
                user: { $ne: '' },
                enabled: true,
                deleted: false,
            },
        );
        if (!appInstalls || appInstalls.length < 1) {
            dto.setStopProcess(
                ResultCode.DO_NOT_CONTINUE,
                `No user for application [${this.getApplication().getName()}] has not been found.`,
            );
            return dto;
        }

        appInstalls.forEach((appInstall) => {
            if (appInstall.getUser()) {
                dto.addItem(body ?? {}, appInstall.getUser());
            }
        });
        return dto;
    }

    protected async getUser(dto: BatchProcessDto, user: string, body: unknown): Promise<BatchProcessDto> {
        const repo = await this.getDbClient().getApplicationRepository();
        const appInstall = await repo.findByNameAndUser(this.getApplication().getName(), user);
        if (!appInstall) {
            dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, `User [${user}] has not been found.`);
            return dto;
        }

        return dto.addItem(body ?? {}, appInstall.getUser());
    }

}

export interface IInput {
    user: string;
}
