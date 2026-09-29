import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import MoneyS45Base, { getGraphqlErrors, IGraphqlResponse, MONEYS_GRAPHQL_URL } from '../MoneyS45Base';
import { ICompany } from './MoneyS4-5GetCompanies';

export const NAME = 'moneys4-create-company';

export default class MoneyS45CreateCompany extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const app = this.getApplication<MoneyS45Base>();
        const data = this.getJsonData(dto);
        const companies = Array.isArray(data) ? data : [data];
        if (!companies.length) {
            return this.setJsonData<IResponse>(dto, []);
        }

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            MONEYS_GRAPHQL_URL,
            JSON.stringify({
                query: `mutation (${companies.map((_, i) => `$c${i}: CompanyInput!`).join(', ')}) { ${companies.map((_, i) => `c${i}: CreateCompany(Company: $c${i}) { ID }`).join(' ')} }`,
                variables: Object.fromEntries(companies.map((company, i) => [`c${i}`, company])),
            }),
        );
        /* eslint-disable @typescript-eslint/naming-convention */
        const response = await this.getSender().send<IGraphqlResponse<Record<string, { ID?: string } | null>>>(
            requestDto,
            200,
        );
        /* eslint-enable @typescript-eslint/naming-convention */
        const body = response.getJsonBody();
        const errors = getGraphqlErrors(body);
        if (errors.length) {
            throw new OnRepeatException(60, 10, errors.join('\n'));
        }

        return this.setJsonData<IResponse>(dto, companies.map((_, i) => body.Data?.[`c${i}`]?.ID ?? ''));
    }

    protected getJsonData<T>(dto: ProcessDto<T>): T {
        return dto.getJsonData();
    }

    protected setJsonData<T>(dto: ProcessDto, response: T): ProcessDto<T> {
        return dto.setNewJsonData(response);
    }

}

export type IInput = ICompany | ICompany[];

export type IResponse = string[];
