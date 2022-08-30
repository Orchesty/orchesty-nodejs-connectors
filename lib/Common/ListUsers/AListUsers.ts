import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export default class ListUsers extends ABatchNode {

    public getName(): string {
        return `${this.getApplication().getName()}-list-users`;
    }

    public async processAction(_dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { user, ...rest } = _dto.getJsonData();
        let dto;
        if (!user) {
            dto = await this.getUsers(_dto, rest);
        } else {
            dto = await this.getUser(_dto, user, rest);
        }

        return dto;
    }

    protected async getUsers(dto: BatchProcessDto, body: unknown): Promise<BatchProcessDto> {
        const repo = await this.getDbClient().getApplicationRepository();
        const appInstalls = await repo.findMany({ key: this.getApplication().getName() });
        if (!appInstalls || appInstalls.length < 1) {
            return dto;
        }

        appInstalls.forEach((appInstall) => {
            dto.addItem(body ?? {}, appInstall.getUser());
        });
        return dto;
    }

    protected async getUser(dto: BatchProcessDto, user: string, body: unknown): Promise<BatchProcessDto> {
        const repo = await this.getDbClient().getApplicationRepository();
        const appInstall = await repo.findByNameAndUser(this.getApplication().getName(), user);
        if (!appInstall) {
            return dto;
        }

        return dto.addItem(body ?? {}, appInstall.getUser());
    }

}

export interface IInput {
    user: string;
}