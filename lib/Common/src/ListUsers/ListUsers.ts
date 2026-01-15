import { GROUP_TIME, GROUP_VALUE, TIME, USE_LIMIT, VALUE } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import {
    IApplicationInstallQueryFilter,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstallRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { APPLICATIONS, getLimiterKey, getLimiterKeyWithGroup } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export default class ListUsers extends ABatchNode {

    public getName(): string {
        return `${this.getApplication().getName()}-list-users`;
    }

    public async processAction(_dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const userHeader = _dto.getUser();
        const { user, ...rest } = _dto.getJsonData();

        let runnableUser: string | undefined = user ?? userHeader;
        if (runnableUser === orchestyOptions.systemUser) {
            runnableUser = undefined;
        }

        let dto;
        if (!runnableUser) {
            dto = await this.getUsers(_dto, rest);
        } else {
            dto = await this.getUser(_dto, runnableUser, rest);
        }

        return dto;
    }

    protected async getUsers(dto: BatchProcessDto, body: unknown): Promise<BatchProcessDto> {
        const repo = this.getDbClient().getApplicationRepository();
        const appInstalls = await repo.findMany(
            {
                names: [this.getApplication().getName()],
                enabled: true,
            },
        );
        if (!appInstalls || appInstalls.length < 1) {
            dto.setStopProcess(
                ResultCode.DO_NOT_CONTINUE,
                `No user for application [${this.getApplication().getName()}] has not been found.`,
            );
            return dto;
        }

        const allAppInstalls = await repo.findMany(this.getFilterForLimiter(dto));

        appInstalls.forEach((appInstall) => {
            const user = appInstall.getUser();
            if (user) {
                const limiterKeys = allAppInstalls
                    .filter((userAppInstall) => userAppInstall.getUser() === user)
                    .map((filteredAppInstall) => this.mapLimiterKey(filteredAppInstall, user))
                    .filter((keys) => keys);

                dto.addItem(body ?? {}, user, limiterKeys.join(';'));
            }
        });
        return dto;
    }

    protected async getUser(dto: BatchProcessDto, user: string, body: unknown): Promise<BatchProcessDto> {
        const repo = this.getDbClient().getApplicationRepository();
        const appInstall = await repo.findByNameAndUser(this.getApplication().getName(), user);
        if (!appInstall) {
            dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, `User [${user}] has not been found.`);
            return dto;
        }

        const allAppInstalls = await repo.findMany(this.getFilterForLimiter(dto, user));

        const limiterKeys = allAppInstalls
            .filter((userAppInstall) => userAppInstall.getUser() === user)
            .map((filteredAppInstall) => this.mapLimiterKey(filteredAppInstall, user))
            .filter((keys) => keys);

        return dto.addItem(body ?? {}, appInstall.getUser(), limiterKeys.join(';'));
    }

    private mapLimiterKey(appInstall: ApplicationInstall, user: string): string {
        const limiterForm = appInstall.getSettings()[CoreFormsEnum.LIMITER_FORM];
        if (!limiterForm) {
            return '';
        }

        const time = limiterForm?.[TIME] ?? undefined;
        const value = limiterForm?.[VALUE] ?? undefined;

        const useLimit = limiterForm?.[USE_LIMIT] ?? undefined;
        if (!useLimit || !time || !value) {
            return '';
        }

        const groupTime = limiterForm?.[GROUP_TIME] ?? undefined;
        const groupValue = limiterForm?.[GROUP_VALUE] ?? undefined;

        const key = `${user}|${appInstall.getName()}`;

        if (groupTime && groupValue) {
            return getLimiterKeyWithGroup(
                key,
                time,
                value,
                `|${appInstall.getName()}`,
                groupTime,
                groupValue,
            );
        }

        return getLimiterKey(key, time, value);
    }

    private getFilterForLimiter(dto: BatchProcessDto, user?: string): IApplicationInstallQueryFilter {
        const headerApplications = dto.getHeader(APPLICATIONS, '')?.split(';');
        const filter: IApplicationInstallQueryFilter = {
            enabled: true,
        };

        if (headerApplications && headerApplications[0] !== '') {
            filter.names = headerApplications;
        }

        if (user) {
            filter.users = [user];
        }

        return filter;
    }

}

export interface IInput {
    user: string;
}
