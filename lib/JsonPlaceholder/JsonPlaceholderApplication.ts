import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const NAME = 'json-placeholder';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default class JsonPlaceholderApplication extends ABasicApplication {

    protected isInstallable = false;

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'JsonPlaceholder Application';
    }

    public getDescription(): string {
        return 'Free fake and reliable API for testing and prototyping. Powered by JSON Server + LowDB.';
    }

    public getFormStack(): FormStack {
        return new FormStack();
    }

    public isAuthorized(): boolean {
        return true;
    }

    public getRequestDto(): RequestDto {
        throw new Error('Method getRequestDto is not supported, use getRequestDtoWithoutInstallation instead.');
    }

    public getRequestDtoWithoutInstallation(
        dto: AProcessDto,
        method: HttpMethods,
        path?: string,
        data?: unknown,
    ): RequestDto {
        const url = new URL(path ?? '', BASE_URL).href;

        return new RequestDto(url, method, dto, data);
    }

}

export function filterToQueryParamString<
    T extends Record<string, string | number | boolean>,
>(keys: (keyof T)[], filter?: T): string {
    if (!filter) {
        return '';
    }

    const params = new URLSearchParams();

    keys.forEach((key) => {
        if (key in filter) {
            params.set(key as string, String(filter[key]));
        }
    });

    return params.size ? `?${params}` : '';
}
