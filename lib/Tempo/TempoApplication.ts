import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

const BASE_URL = 'https://api.tempo.io/4';

export const NAME = 'tempo';

export default class TempoApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Tempo Application';
    }

    public getDescription(): string {
        return 'Resource & cost management Project management Predictive scheduling & resource optimization Data visualization & reporting Tempo products are flexible so companies can create smarter, ship better, and move faster — without limitations.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDMwMCAzMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgyLDAsMCwyLDAsMCkiPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjkyOTY5LDAsMCwwLjI5Mjk2OSwwLDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM3NC41LDE5OC44TDM0MC43LDE2NUMzMzguMiwxNjIuNSAzMzQuMSwxNjIuNSAzMzEuNiwxNjVMMjI4LDI2OC42TDE4Ni43LDIyNy4zQzE4NC4yLDIyNC44IDE4MC4xLDIyNC44IDE3Ny42LDIyNy4zTDEzOS42LDI2NS4zQzEzNy4xLDI2Ny44IDEzNy4xLDI3MS45IDEzOS42LDI3NC40TDIxOS4yLDM1NEMyMjAuNSwzNTUuMyAyMjIuMSwzNTUuOSAyMjMuOCwzNTUuOUMyMjUuNSwzNTUuOSAyMjcuMSwzNTUuMyAyMjguNCwzNTRMMzc0LjUsMjA3LjlDMzc3LDIwNS40IDM3NywyMDEuMyAzNzQuNSwxOTguOFoiIHN0eWxlPSJmaWxsOnJnYigwLDcxLDEzNyk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjkyOTY5LDAsMCwwLjI5Mjk2OSwwLDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE1Mi4wMTcsNDM2LjEwM0M1Mi41NDksMzc4LjY3NSAxOC40NjksMjUxLjQ4NiA3NS44OTcsMTUyLjAxN0M4MC43OTcsMTQzLjUzIDg2LjIwNSwxMzUuNTE5IDkyLjA2LDEyOEwzNC4zNDcsMTI4QzM0LjM0MywxMjguMDA3IDM0LjMzOSwxMjguMDE0IDM0LjMzNSwxMjguMDIxQy0zNi4zNDYsMjUwLjQ0NCA1LjU5OSw0MDYuOTg1IDEyOC4wMjEsNDc3LjY2NUMxNTguMDMyLDQ5NC45OTIgMTkwLjA5Myw1MDUuNTUxIDIyMi40MzcsNTA5LjgxNUwxODkuNzMxLDQ1My4xNjdDMTc2Ljg2Miw0NDguODI2IDE2NC4yMzEsNDQzLjE1NSAxNTIuMDE3LDQzNi4xMDNaIiBzdHlsZT0iZmlsbDpyZ2IoMCwxNzQsMjM5KTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yOTI5NjksMCwwLDAuMjkyOTY5LDAsMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDc3LjY2NSwzODMuOTc5QzQzMC4zMDQsNDY2LjAxMSAzNDQuMzkxLDUxMS45MDkgMjU2LjAyNSw1MTJMMjI3LjE2NCw0NjIuMDEyQzMwOC41NzgsNDczLjM3OSAzOTIuNDczLDQzNS41NTIgNDM2LjEwMywzNTkuOTgzQzQ2Mi40NzQsMzE0LjMwNiA0NjkuNTQ5LDI2Mi43ODQgNDU5Ljg1NywyMTQuODU3TDQ5Mi41NTcsMTU4LjIxOEM1MjEuODE2LDIyOS4xNDYgNTE4Ljk5NCwzMTIuMzk1IDQ3Ny42NjUsMzgzLjk3OVoiIHN0eWxlPSJmaWxsOnJnYigyNDUsMTM1LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yOTI5NjksMCwwLDAuMjkyOTY5LDAsMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNTMuMDM5LDEwMEwxMTguMzg4LDEwMEMxODMuNTMyLDQyLjUyMSAyODAuNTg4LDMwLjA1OCAzNTkuOTgzLDc1Ljg5N0M0MDEuNzgxLDEwMC4wMjkgNDMyLjAzMywxMzYuNDggNDQ4LjgwMSwxNzguMDE3TDQ3Ny42OSwxMjcuOTc5QzQ1NS45NzUsOTAuMjk0IDQyNC4zNTQsNTcuNjQ1IDM4My45NzksMzQuMzM1QzI3MS40MjUsLTMwLjY0OCAxMzAuMDMzLC0wLjQzMiA1My4wMzksMTAwWiIgc3R5bGU9ImZpbGw6cmdiKDAsMTcyLDEwMSk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM));
        form
            .addField(new Field(FieldType.TEXT, TOKEN, 'token', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`${BASE_URL}${url}`, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN]}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
