import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    TOKEN,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'digitoo';

const BASE_URL = 'https://api.digitoo.cz/';

export default class DigitooApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Digitoo';
    }

    public getDescription(): string {
        return 'Cloud-based application that automates and digitalizes the accounting process without the need of manual data entry';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjkzIDEwMC4wOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMwMDY1ZWU7fS5jbHMtMntmaWxsOiNmZWFkZWU7fS5jbHMtM3tmaWxsOiNmZWNiZWU7fS5jbHMtNHtmaWxsOiMwMDM2Zjg7fS5jbHMtNXtmaWxsOiNmZTVhMDA7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTk5Ljg3LDUwYzAsMTYuNjcsMCwzMy4zNCwwLDUwQzY4LjMxLDEwMCwwLDEwMC4wNywwLDEwMC4wN2ExNC43NCwxNC43NCwwLDAsMSwwLTEuNjVTMCwzMS42OCwwLDBxNTAsLjA4LDk5LjkzLDBoMEM5OS44NSwxNi42Niw5OS44NywzMy4zMyw5OS44Nyw1MFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgMC4wMSkiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik03OS44Myw1MC4xNGMuNjcsMTMuMjUtMTAsMjYuNTctMjMuNTQsMjkuMy0yLjE0LjQ0LTQuMzEsMS02LjUzLjQ4YTMuMzIsMy4zMiwwLDAsMS0xLTIuODJxMC0xMi4wNiwwLTI0LjEyYTMuNSwzLjUsMCwwLDEsLjktMi44NXEwLTE0LC4xLTI3LjkyYzAtLjc1LS4zOS0xLjYzLjM3LTIuMjcsMSwuODguOTQsMi4xLDEsMy4yOCwwLDcuNCwwLDE0LjgsMCwyMi4yLDAsMy42OC4xLDMuNzgsMy42OSwzLjc5LDcuMjUsMCwxNC40OSwwLDIxLjc0LDBDNzcuNzEsNDkuMjMsNzksNDkuMDUsNzkuODMsNTAuMTRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIDAuMDEpIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzkuODMsNTAuMTRjLTksMC0xOC0uMDYtMjcsLjA2LTIuMiwwLTIuNzItLjcxLTIuNjktMi43OS4wOS05LjE2LDAtMTguMzIsMC0yNy40N0M2MC44NCwxOS44Niw2OSwyNC42OCw3NC44OSwzMy4yOEEyNi44MSwyNi44MSwwLDAsMSw3OS44Myw1MC4xNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgMC4wMSkiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik00OS42OSw1MC4xM3EwLDE0LjkuMDcsMjkuNzljLTEuNjQtLjA4LTMuMy4yNC00Ljg5LS4zNy00LjcuNDctOC42My0xLjQ5LTEyLjM4LTRBMzAuMTcsMzAuMTcsMCwwLDEsMjEuNDQsNjJhMTUuNCwxNS40LDAsMCwxLTEuMS03LjM2Yy0uMDYtLjIxLS4xNC0uNDItLjE4LS42NC0uNjMtMy41OS0uNDItMy44NSwzLjEzLTMuODVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIDAuMDEpIi8+PHBhdGggY2xhc3M9ImNscy01IiBkPSJNMTkuODUsNDQuNzdWMjEuMzljMC0uODEtLjE1LTEuNjEsMS4xNS0xLjYsNy44OSwwLDE1Ljc3LDAsMjMuNzMuMTZDMzEuMzksMjMuMTgsMjMuMiwzMS40NSwxOS44NSw0NC43N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgMC4wMSkiLz48cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik0yMC4zNCw1NC42NGMuOTQsMTEuODIsMTIuODYsMjMuOTMsMjQuNTIsMjQuOTEtLjM2LjYzLTEsLjU1LTEuNTcuNTUtNy4zLDAtMTQuNjEsMC0yMS45MSwwLTEuMSwwLTEuNTYtLjI1LTEuNTUtMS40Ni4wNS03LjQ2LDAtMTQuOTIsMC0yMi4zOEEyLDIsMCwwLDEsMjAuMzQsNTQuNjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIDAuMDEpIi8+PC9zdmc+';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const token = applicationInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[TOKEN];
        if (!token) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have token!`);
        }
        const request = new RequestDto(
            `${BASE_URL}${url}`,
            method,
            dto,
        );
        request.setHeaders(
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
            },
        );

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Admin API access token', undefined, true));

        return new FormStack().addForm(form);
    }

}
