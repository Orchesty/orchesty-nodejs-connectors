import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { createHash, createHmac, randomUUID } from 'crypto';

export const NAME = 'ceska-posta';
export const API_TOKEN = 'api_token';
export const CONTENT_SHA256 = 'Authorization-Content-SHA256';
export const TIMESTAMP = 'Authorization-Timestamp';
export const SECRET_KEY = 'secret_key';
export const HMAC256_HASH = 'Authorization';

export default class CeskaPostaApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Ceska Posta';
    }

    public getDescription(): string {
        return 'National postal operator that provides a full postal service within Czech Republic';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjYyIDUzLjAzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZjYzIwMDt9LmNscy0ye2ZpbGw6I2ZiYmQwMDt9LmNscy0ze2ZpbGw6I2ZkZGY4NTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzEuNTgsMjMuNjFhMS4zMiwxLjMyLDAsMCwxLC44NCwxLjk0LDI5LjI0LDI5LjI0LDAsMCwwLTEuNzUsMTBBMjguNTQsMjguNTQsMCwwLDAsNTQsNjMuMjhhMjAuNTgsMjAuNTgsMCwwLDAsOC43NywwLDE0LjIxLDE0LjIxLDAsMSwwLTE1Ljg3LTIwLjlBMTQuMTEsMTQuMTEsMCwwLDAsNDguMiw1OC41M2wuMzkuNDhjLS4xMy4xOC0uMjQuMDYtLjM0LDBhMjYsMjYsMCwwLDEtMTQtMTUuODYsMiwyLDAsMCwxLDAtMS4zOGMzLjY0LTEwLjI2LDEwLjc5LTE2LjQ2LDIxLjU2LTE4YTI2LjA2LDI2LjA2LDAsMCwxLDkuMSw1MS4yOSw1OC40Nyw1OC40NywwLDAsMS0xMi40NCwxLjQ1LDQ5Ljc1LDQ5Ljc1LDAsMCwxLTIwLjIzLTQuMzZRMTAuNTIsNjIuNDQsMi43NywzOS45MUE1MS43OSw1MS43OSwwLDAsMSwuMTksMjUuNzQsMS44NSwxLjg1LDAsMCwxLDEuNzEsMjMuNmM3LjI1LDAsMTQuNSwwLDIxLjc1LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4xOSAtMjMuNDgpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzguNjgsNzAuNTNhNTIuNzgsNTIuNzgsMCwwLDAsMy44Mi00LjQ4QTI3LjY4LDI3LjY4LDAsMCwwLDg3LjEsNDMuMWE0LjY3LDQuNjcsMCwwLDEsLjE3LTIsMjguMTEsMjguMTEsMCwwLDAtMS4wOS0xNS4zMWMtLjUxLTEuNDEuMDgtMi4yOCwxLjU4LTIuMjloOC40NmEyLDIsMCwwLDEsMi4zMiwxLjg4QTQwLjE1LDQwLjE1LDAsMCwxLDc5LjM5LDcwLjNjLS4yMi4xMy0uNDMuMzMtLjczLjIyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMTkgLTIzLjQ4KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTMxLjU4LDIzLjYxYzAsLjEuMTQuMzItLjA5LjI1YTkuMTgsOS4xOCwwLDAsMC0yLjI4LS4wOUgyLjY4Yy0uMzMsMC0uNjkuMTQtMS0uMTZhMS44MywxLjgzLDAsMCwxLC45My0uMTFoMjhBMS43NiwxLjc2LDAsMCwxLDMxLjU4LDIzLjYxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMTkgLTIzLjQ4KSIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTc4LjY2LDcwLjUyYzAsLjIzLDAsLjQyLS4zNC40LDAtLjI4LjExLS4zOC4zNi0uMzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4xOSAtMjMuNDgpIi8+PC9zdmc+';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_TOKEN, 'api token', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET_KEY, 'secret key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_TOKEN] && authorizationForm?.[SECRET_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const uuidv4 = randomUUID();
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const timestamp = DateTimeUtils.getTimestamp(DateTimeUtils.getUtcDate()) / 1000;
        const url = `https://b2b.postaonline.cz:444/restservices/ZSKService/v1/${uri}`;
        const request = new RequestDto(url, method, dto);
        const headers: HeadersInit = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [TIMESTAMP]: timestamp.toString(),
            [CommonHeaders.AUTHORIZATION]: authorizationForm[API_TOKEN],
        };
        if (method === HttpMethods.GET) {
            const signature = `;${timestamp};${uuidv4}`;
            const hmac256hash = createHmac('sha256', authorizationForm[SECRET_KEY]).update(signature).digest('base64');
            headers[HMAC256_HASH] = `CP-HMAC-SHA256 nonce="${uuidv4}" signature="${hmac256hash}"`;
        } else {
            const sha256Hash = createHash('sha256').update(JSON.stringify(data)).digest('hex');
            const signature = `${sha256Hash};${timestamp};${uuidv4}`;
            const hmac256hash = createHmac('sha256', authorizationForm[SECRET_KEY]).update(signature).digest('base64');
            headers[CONTENT_SHA256] = sha256Hash;
            headers[HMAC256_HASH] = `CP-HMAC-SHA256 nonce="${uuidv4}" signature="${hmac256hash}"`;
        }
        request.setHeaders(headers);
        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
