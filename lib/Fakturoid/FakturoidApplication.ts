import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit, Headers } from 'node-fetch';

export const BASE_URL = 'https://app.fakturoid.cz/api/v2';
export const BASE_ACCOUNTS = 'accounts';
export const ACCOUNT = 'account';

export default class FakturoidApplication extends ABasicApplication {

    public getName(): string {
        return 'fakturoid';
    }

    public getPublicName(): string {
        return 'Fakturoid';
    }

    public getDescription(): string {
        return 'Online invoicing service for freelancers and small businesses';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0iVnJzdHZhXzEiIGlua3NjYXBlOnZlcnNpb249IjAuOTIuNCAoNWRhNjg5YzMxMywgMjAxOS0wMS0xNCkiIHNvZGlwb2RpOmRvY25hbWU9ImZha3R1cm9pZF9sb2dvLnN2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIgoJIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO3N0cm9rZTojRTgzRThGO3N0cm9rZS13aWR0aDowLjUyMDU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMUExOTE5O30KPC9zdHlsZT4KPGc+CgkKCQk8c29kaXBvZGk6bmFtZWR2aWV3ICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgYm9yZGVyb3BhY2l0eT0iMSIgZml0LW1hcmdpbi1ib3R0b209IjAiIGZpdC1tYXJnaW4tbGVmdD0iMCIgZml0LW1hcmdpbi1yaWdodD0iMCIgZml0LW1hcmdpbi10b3A9IjAiIGdyaWR0b2xlcmFuY2U9IjEwIiBndWlkZXRvbGVyYW5jZT0iMTAiIGlkPSJuYW1lZHZpZXcxNSIgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iZzEyIiBpbmtzY2FwZTpjeD0iMzI0Ljc4ODYyIiBpbmtzY2FwZTpjeT0iLTcyLjY2NzAzMyIgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDgiIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkxOCIgaW5rc2NhcGU6d2luZG93LXg9Ijk1MyIgaW5rc2NhcGU6d2luZG93LXk9IjEwODAiIGlua3NjYXBlOnpvb209IjAuNzA1ODgyMzUiIG9iamVjdHRvbGVyYW5jZT0iMTAiIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgc2hvd2dyaWQ9ImZhbHNlIj4KCQk8L3NvZGlwb2RpOm5hbWVkdmlldz4KCTxnIGlkPSJnMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTcuMjExNSwtNDkuMzIzMTYzKSI+CgkJPGcgaWQ9Imc2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODgpIj4KCQk8L2c+CgkJPGcgaWQ9ImcxNDA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOTcuMDQ4NSw0OC43OTQxNjMpIj4KCQkJPHBhdGggaWQ9InJlY3QxNDA0IiBjbGFzcz0ic3QwIiBkPSJNNDguNywxM2gzLjJjMjIuMiwwLDQwLjMsMTMuNSw0MC4zLDMwLjJ2MTguMmMwLDE2LjctMTgsMzAuMi00MC4zLDMwLjJoLTMuMgoJCQkJYy0yMi4yLDAtNDAuMy0xMy41LTQwLjMtMzAuMlY0My4yQzguNCwyNi41LDI2LjQsMTMsNDguNywxM3oiLz4KCQkJPHBhdGggaWQ9InBhdGgyIiBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiBjbGFzcz0ic3QxIiBkPSJNNTguNSw2NmMwLDMuNiwyLjksNS43LDcuOSw1LjdjNC45LDAsNy4zLTIuNCw3LjMtNy4xdi00LjQKCQkJCWgtNC4xQzYwLjksNjAuMiw1OC41LDYyLjIsNTguNSw2NiIvPgoJCQk8cGF0aCBpZD0icGF0aDQiIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIGNsYXNzPSJzdDEiIGQ9Ik01MCwyLjFDMjIuNCwyLjEsMCwxOS45LDAsNDEuOHYxNy44YzAsMjEuOSwyMi40LDM5LjcsNTAsMzkuNwoJCQkJYzI3LjYsMCw1MC0xNy44LDUwLTM5LjdWNDEuOEMxMDAsMTkuOSw3Ny42LDIuMSw1MCwyLjF6IE0zMy44LDYxaC00Ljl2MTkuM2gtNC42Yy0zLjcsMC02LjktMi44LTYuOS02LjhWNDMKCQkJCWMwLTkuNCw0LjQtMjEuMSwxNy40LTI0QzQ4LDE2LDUxLjcsMjIuNSw1MS43LDIyLjVzLTguMy0wLjEtMTQuOCw1Yy0zLjcsMi45LTcuOSw5LjMtOC4xLDE2LjV2OC45YzguMiwxLjYsMTQuNy0xLjIsMTYuNi0yCgkJCQlsMC4zLDBDNDUuOCw1MC44LDQ1LjIsNjEsMzMuOCw2MXogTTg0LjksNjQuNWMwLDkuNy03LjIsMTYuNS0xNy40LDE2LjVoLTIuM2MtMTAuOSwwLTE4LjQtNi4xLTE4LjQtMTQuNmMwLTguMiw2LTE0LjQsMjIuOS0xNC40CgkJCQloNHYtMC42YzAtNi41LTMuMS0xMS4xLTkuOS0xMS4xYy04LjMsMC0xMi45LDMuMi0xNC42LDUuM2gtMC40di0zLjdjMC01LjEsNC42LTExLjMsMTYuNy0xMS4zYzEwLjIsMCwxOS40LDcuNCwxOS40LDIzLjNWNjQuNXoiCgkJCQkvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): RequestDto {
        const userName = applicationInstall.getSettings()[AUTHORIZATION_FORM][USER];
        const password = applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD];

        const headers = new Headers({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userName}:${password}`)}`,
        });

        return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, ACCOUNT, 'Account', null, true))
            .addField(new Field(FieldType.TEXT, USER, 'Username', null, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'API key', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[ACCOUNT] && authorizationForm?.[USER] && authorizationForm?.[PASSWORD];
    }

}
