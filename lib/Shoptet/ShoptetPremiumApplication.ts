import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ABaseShoptet, { BASE_URL } from './ABaseShoptet';

export const NAME = 'shoptet-premium';

export default class ShoptetPremiumApplication extends ABaseShoptet {

    protected authorizationHeader = 'Shoptet-Private-API-Token';

    public getDescription(): string {
        return 'Platform for team communication: everything in one place, instantly searchable, available wherever you go';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Shoptet Premium';
    }

    public getLogo(): string | null {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KPC9zdHlsZT4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0MjYpIj4KCTxyZWN0IHg9IjE0NTgiIHk9IjAiIGNsYXNzPSJzdDAiIHdpZHRoPSI2OC4xIiBoZWlnaHQ9IjMyIi8+Cgk8cmVjdCB4PSIxNDI2IiB5PSI2Ny45IiBjbGFzcz0ic3QwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIuNCIvPgoJPHJlY3QgeD0iMTQ5My43IiB5PSIwIiBjbGFzcz0ic3QwIiB3aWR0aD0iMzIuNCIgaGVpZ2h0PSI2OC43Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Shoptet private API token', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: string,
    ): RequestDto {
        const headers = {
            [this.authorizationHeader]: applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN],
            [CommonHeaders.CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
        };

        return new RequestDto(
            `${BASE_URL}/${url}`,
            parseHttpMethod(method),
            dto,
            data,
            headers,
        );
    }

}
