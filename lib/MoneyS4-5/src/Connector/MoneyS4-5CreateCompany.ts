import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import MoneyS45Base from '../MoneyS45Base';
import { IResponse as IInput } from './MoneyS4-5GetCompanies';

const MONEYS4_CREATE_COMPANY = 'v2.0/Company';

export const NAME = 'moneys4-create-company';

export default class MoneyS45CreateCompany extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const app = this.getApplication<MoneyS45Base>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            MONEYS4_CREATE_COMPANY,
            JSON.stringify(this.getJsonData(dto)),
        );
        const response = await this.getSender().send<IResponse>(requestDto, 200);
        return this.setJsonData<IResponse>(dto, response.getJsonBody());
    }

    protected getJsonData<T>(dto: ProcessDto<T>): T {
        return dto.getJsonData();
    }

    protected setJsonData<T>(dto: ProcessDto, response: T): ProcessDto<T> {
        return dto.setNewJsonData(response);
    }

}

export type IResponse = string[];
