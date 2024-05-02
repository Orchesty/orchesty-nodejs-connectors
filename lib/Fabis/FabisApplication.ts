import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const FABIS_APPLICATION = 'fabis';

export default class FabisApplication extends ABasicApplication {

    public getName(): string {
        return FABIS_APPLICATION;
    }

    public getPublicName(): string {
        return 'Fabis';
    }

    public getDescription(): string {
        return 'Agenda školení, lékařských prohlídek či pracovních úrazů v jediné aplikaci';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, ACCESS_TOKEN, 'Access Token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[ACCESS_TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const request = new RequestDto(`https://api.precontrol.cz/api/${url}`, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${authorizationForm?.[ACCESS_TOKEN]}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getLogo(): string {
        return 'PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQ1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMi4wMDYgNDMuOTVWMjAuNTU1aDcuNzQ4VjEzLjk1aC03Ljc0OHYtMi4wMzdjMC0zLjcwMyAxLjk1Mi01LjQzMiA0LjU1NS01LjQzMiAxLjUzOCAwIDMuMDE2LjU1NiA0LjYxMyAxLjYwNWwyLjc4LTUuNjE3QzIxLjQ5OS44NjQgMTguNzE5IDAgMTYuMDU4IDAgOS45NjYgMCA0LjQ5NSAzLjc2NSA0LjQ5NSAxMS45MTN2Mi4wMzdIMHY2LjYwNWg0LjQ5NVY0My45NWg3LjUxMVptMzUuMDc3LTI2LjIzNWMtMS43NDUtMy4wMjUtNS42MTktNC45MzgtOS42Ny00LjkzOC04Ljg3Mi0uMDYyLTE1Ljg1MSA1LjQzMi0xNS44NTEgMTUuOTI2IDAgMTAuNjc5IDYuNjU0IDE2LjIzNCAxNS42NDQgMTYuMTcyIDMuNC0uMDYyIDguMTMyLTEuNzkgOS44NzctNS4zN2wuMzU1IDQuNDQ0aDcuMDk3VjEzLjUxOEg0Ny4zMmwtLjIzNyA0LjE5N1ptLTkuMDIgMS43OWMxMS44MyAwIDExLjgzIDE4LjQ1NyAwIDE4LjQ1Ny00Ljk2OCAwLTguOTktMy40NTctOC45OS05LjI2IDAtNS44MDIgNC4wMjItOS4xOTcgOC45OS05LjE5N1ptMzkuMDAzLjMwOWM0LjgyIDAgOC42MzYgMy4zOTUgOC42MzYgOC44ODggMCA1LjMwOS0zLjgxNSA4Ljk1LTguNjM2IDguOTUtNC43MzEgMC04LjgxMi0zLjQ1Ni04LjgxMi04Ljk1IDAtNS4zMDggNC4wOC04Ljg4OCA4LjgxMi04Ljg4OFpNNjAuMjQuOHY0My4xNWg3LjAzOGwuNTAzLTQuMTk3YzIuMzM2IDMuNjQxIDYuMDkxIDQuODc2IDkuNzg4IDQuODc2IDguOTMxIDAgMTUuNjQ0LTUuOTI2IDE1LjY0NC0xNS45MjYgMC0xMC40OTMtNi41OTQtMTUuOTI1LTE1LjQ2Ni0xNS45MjUtMy4xOTQgMC04LjE5MiAxLjcyOC05Ljk2NiA0Ljg3NlYuODAxSDYwLjI0Wm00NS40MzMgMTIuNTk0aC03LjUxN3YzMC41NTVoNy41MTdWMTMuMzk0WiIgZmlsbD0iIzAwMCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTcuNDc4IDQuOTM4YzAtMi45MzIgMi4yMTgtNC4zOTggNC40MzYtNC4zOThzNC40MzYgMS40NjYgNC40MzYgNC4zOThjMCA1Ljg2NC04Ljg3MiA1Ljg2NC04Ljg3MiAwWiIgZmlsbD0iIzI3QkFFNyIvPjxwYXRoIGQ9Ik0xMzYuNDQ5IDE2LjY2N2MtMy40OS0zLjA4Ni03LjA2OC00LjAxMi0xMS44MjktNC4wMTItNS41MyAwLTEyLjgwNSAyLjQ2OS0xMi44MDUgOS41MDYgMCA2LjkxMyA2LjgzMSA5LjAxMiAxMi41NjggOS40NDQgNC4zMTguMjQ3IDYuMDMzIDEuMTExIDYuMDMzIDMuMjEgMCAyLjIyMi0yLjYzMiAzLjcwNC01LjQ3MSAzLjY0Mi0zLjQwMS0uMDYyLTguMzEtMS44NTItMTAuNDY4LTQuMjZsLTMuNjk3IDUuMzcxYzQuNDM2IDQuNjMgOS4yMjcgNS40MzIgMTQuMDQ3IDUuNDMyIDguNjY1IDAgMTMuMDQxLTQuNjMgMTMuMDQxLTEwIDAtOC4wODYtNy4yNzQtOS4zODMtMTIuOTgyLTkuNzUzLTMuOTAzLS4yNDctNS42NzgtMS4zNTgtNS42NzgtMy4zMzMgMC0xLjkxNCAxLjk4MS0zLjAyNSA1LjU2LTMuMDI1IDIuODY4IDAgNS4zNTMuNjggNy41MTEgMi43MTZsNC4xNy00LjkzOFoiIGZpbGw9IiMwMDAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0NS4yIDQwLjgzMnYxLjc0OWgtMS4wNDF2LTQuOTRoMS45NDNjLjM3NCAwIC42OTEuMDY3Ljk1Ny4yLjI2My4xMy40NjQuMzE4LjYwMi41NjIuMTM5LjI0LjIxLjUyNC4yMS44NTMgMCAuMzI2LS4wNzEuNjEtLjIxMi44NDVhMS4zNzQgMS4zNzQgMCAwIDEtLjY2LjU2bDEuMDQ3IDEuOTJoLTEuMTUxbC0uOTM0LTEuNzVoLS43NjFabTAtLjg0MnYtMS40OTRoLjcwNGMuMjAxIDAgLjM2OC4wMjkuNDk4LjA4OGEuNjAxLjYwMSAwIDAgMSAuMjk3LjI1NS44MjYuODI2IDAgMCAxIC4wOTcuNDE3Ljc3NS43NzUgMCAwIDEtLjA5Ny40MDUuNTkyLjU5MiAwIDAgMS0uMjk0LjI0NyAxLjMyNiAxLjMyNiAwIDAgMS0uNDk4LjA4MmgtLjcwN1oiIGZpbGw9IiMwMDAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0NS44MzQgMzUuOTQ4YTQuMTU5IDQuMTU5IDAgMCAwLTQuMTUgNC4xNjQgNC4xNTcgNC4xNTcgMCAwIDAgNC4xNSA0LjE2M0E0LjE3MSA0LjE3MSAwIDAgMCAxNTAgNDAuMTEyYTQuMTcyIDQuMTcyIDAgMCAwLTQuMTY2LTQuMTY0Wm0wIC45MjZhMy4yMzIgMy4yMzIgMCAwIDEgMy4yMzcgMy4yMzggMy4yMjkgMy4yMjkgMCAxIDEtNi40NTggMCAzLjIyOSAzLjIyOSAwIDAgMSAzLjIyMS0zLjIzOFoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=';
    }

}
