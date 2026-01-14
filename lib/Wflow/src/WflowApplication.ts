import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WflowGetOrganizationsConnector, { IResponse } from './Connector/WflowGetOrganizationsConnector';

export const NAME = 'wflow';
export const ORGANIZATION_FORM = 'organization-form';
export const ORGANIZATION = 'organization';

export default class WflowApplication extends AOAuth2Application {

    public constructor(
        provider: OAuth2Provider,
        private readonly wflowGetOrganizationsConnector: WflowGetOrganizationsConnector,
    ) {
        super(provider);
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'wflow';
    }

    public getDescription(): string {
        return 'Digital accounting that saves you time and money';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KPHBhdGggZD0iTTAgMCBDMC43OTAxOTUzMSAtMC4wMzI4NzEwOSAxLjU4MDM5MDYyIC0wLjA2NTc0MjE5IDIuMzk0NTMxMjUgLTAuMDk5NjA5MzggQzYuNjA1Njk3ODUgLTAuMTM4MTQ3NTEgOS4zMDEwNTA4NCAwLjEzMzY1NzY0IDEyLjYzMjgxMjUgMi44Mzk4NDM3NSBDMTYuNjgyNDM3MDIgNy4wNjA4NDczNiAxNi40MDIyMzg0NSAxMC41NzA2NTQ2OSAxNi41IDE2LjE4NzUgQzE2LjU1NjA3NDIyIDE3LjM4NjMyODEyIDE2LjU1NjA3NDIyIDE3LjM4NjMyODEyIDE2LjYxMzI4MTI1IDE4LjYwOTM3NSBDMTYuNjc2MTMxNSAyMi44NTUyNTgyMiAxNi40NjEwNzg3MyAyNS41ODk3MzAzMSAxMy43MjY1NjI1IDI4Ljk1MzEyNSBDOS40NjIyNTk1MyAzMy4wMjUzNDIyNSA1Ljk2NTc4NTI5IDMyLjY1MTkxNjc3IDAuMzEyNSAzMi42ODc1IEMtMC40OTUwOTc2NiAzMi43MDgxMjUgLTEuMzAyNjk1MzEgMzIuNzI4NzUgLTIuMTM0NzY1NjIgMzIuNzUgQy02Ljg0NzEzMDIxIDMyLjc4MDg3NTQ0IC0xMC4xMjA3NjIwMiAzMi42MTI1MTI2OSAtMTMuODc1IDI5LjQzNzUgQy0xNi43ODkwMzM3NSAyNS43NjYzNDU3IC0xNi4yMDU0NDYxNiAyMC45Njg1OTM2NCAtMTYuMTg3NSAxNi41IEMtMTYuMjAzNjEzMjggMTUuNzAxNDI1NzggLTE2LjIxOTcyNjU2IDE0LjkwMjg1MTU2IC0xNi4yMzYzMjgxMiAxNC4wODAwNzgxMiBDLTE2LjI0MDE5OTA1IDkuNDA3ODczMTMgLTE2LjAwNTk4MDQ2IDYuMTYyMTY1MjUgLTEyLjg3NSAyLjQzNzUgQy05LjIxNTYxOTk1IC0wLjQ0MjcyOTc1IC00LjQ1MjE5NDAxIDAuMDMyMzY2NTIgMCAwIFogIiBmaWxsPSIjMUM0RUZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS44NzUsLTAuNDM3NSkiLz4KPHBhdGggZD0iTTAgMCBDMi4xNTgyMDM4MiAxLjcwODU3ODAzIDIuOTQzMDQzNDkgMi41MzE2OTA4OSAzLjI4MTI1IDUuMzEyNSBDMi45Mzk5MTY3OCA4LjU3NDEyODUzIDEuODk4Mzg4NDIgMTAuMTYyNjY2MTYgMCAxMi44MTI1IEMtMC41NTY4NzUgMTMuNjAyNjk1MzEgLTEuMTEzNzUgMTQuMzkyODkwNjIgLTEuNjg3NSAxNS4yMDcwMzEyNSBDLTIuMzM3MTg3NSAxNi4wOTQ1NTA3OCAtMi4zMzcxODc1IDE2LjA5NDU1MDc4IC0zIDE3IEMtNi44NzUgMTMuMjUgLTYuODc1IDEzLjI1IC04IDExIEMtOS45OCAxMy45NyAtOS45OCAxMy45NyAtMTIgMTcgQy0xMy4zMiAxNS4zNSAtMTQuNjQgMTMuNyAtMTYgMTIgQy0xNS4xMDE3Nzg4MiAxMC4zMjMzMjA0NiAtMTQuMTgwNzg0MzkgOC42NTg4MjM2NyAtMTMuMjUgNyBDLTEyLjczOTUzMTI1IDYuMDcxODc1IC0xMi4yMjkwNjI1IDUuMTQzNzUgLTExLjcwMzEyNSA0LjE4NzUgQy0xMC44NjAwNzgxMiAzLjEwNDY4NzUgLTEwLjg2MDA3ODEyIDMuMTA0Njg3NSAtMTAgMiBDLTguNjggMiAtNy4zNiAyIC02IDIgQy01LjM0IDMuMzIgLTQuNjggNC42NCAtNCA2IEMtMi42OCA0LjAyIC0xLjM2IDIuMDQgMCAwIFogIiBmaWxsPSIjRTlFRUZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNCw4KSIvPgo8cGF0aCBkPSJNMCAwIEMwLjk5IDAuMzMgMS45OCAwLjY2IDMgMSBDMy43MTQ4NDM3NSAzLjE2Nzk2ODc1IDMuNzE0ODQzNzUgMy4xNjc5Njg3NSA0IDYgQzIuNTY2NDA2MjUgOC42NzU3ODEyNSAyLjU2NjQwNjI1IDguNjc1NzgxMjUgMC41NjI1IDExLjMxMjUgQy0wLjA5NjIxMDk0IDEyLjE5NTUwNzgxIC0wLjc1NDkyMTg4IDEzLjA3ODUxNTYzIC0xLjQzMzU5Mzc1IDEzLjk4ODI4MTI1IEMtMi4yMDg5NjQ4NCAxNC45ODQwODIwMyAtMi4yMDg5NjQ4NCAxNC45ODQwODIwMyAtMyAxNiBDLTQuMzIgMTQuMzUgLTUuNjQgMTIuNyAtNyAxMSBDLTYuMDIyNjIyMzEgOS4zNTMxMDM2NSAtNS4wNDMwNDY4IDcuNzA3NTExNDYgLTQuMDYyNSA2LjA2MjUgQy0zLjUxNzIyNjU2IDUuMTQ1OTc2NTYgLTIuOTcxOTUzMTIgNC4yMjk0NTMxMiAtMi40MTAxNTYyNSAzLjI4NTE1NjI1IEMtMSAxIC0xIDEgMCAwIFogIiBmaWxsPSIjRjRGNkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSw5KSIvPgo8cGF0aCBkPSJNMCAwIEMxLjU2MjUgMS4xMjUgMS41NjI1IDEuMTI1IDMgMyBDMi42ODc1IDYuMTg3NSAyLjY4NzUgNi4xODc1IDIgOSBDMS4wMSA5LjMzIDAuMDIgOS42NiAtMSAxMCBDLTIuMzgxMjUwMTggNy4yMzc0OTk2NCAtMi4xOTA3OTMwNiA1LjA1MjY4OTAxIC0yIDIgQy0xLjM0IDEuMzQgLTAuNjggMC42OCAwIDAgWiAiIGZpbGw9IiNFRUYyRkYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcsOCkiLz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        return new FormStack()
            .addForm(
                new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
                    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, false))
                    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, false)),
            )
            .addForm(
                new Form(ORGANIZATION_FORM, 'Organization settings'),
            );
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        path?: string,
        data?: unknown,
    ): RequestDto {
        const headers = {
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        };
        const url = new URL(`/api${path ?? ''}`, 'https://api.wflow.com').href;

        return new RequestDto(url, method, dto, data, headers);
    }

    public getAuthUrl(): string {
        return 'https://account.wflow.com/connect/authorize';
    }

    public getTokenUrl(): string {
        return 'https://account.wflow.com/connect/token';
    }

    public getScopes(): string[] {
        return ['uccl_common_api'];
    }

    public getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

    protected async customFormReplace(formStack: FormStack, applicationInstall: ApplicationInstall): Promise<void> {
        const organizations = (await this.wflowGetOrganizationsConnector.processAction(
            ProcessDto.createForFormRequest(
                NAME,
                applicationInstall.getUser(),
                crypto.randomUUID(),
                'form',
            ),
        )).getJsonData() as IResponse[];

        const form = formStack.getForms().find((item) => item.getKey() === ORGANIZATION_FORM);
        const settings = applicationInstall.getSettings()[ORGANIZATION_FORM];

        if (!form) {
            return;
        }

        const choises: Record<string, string>[]
            = organizations.map((organization) => ({ [organization.subdomain]: organization.name }));

        form.addField(
            new Field(
                FieldType.SELECT_BOX,
                ORGANIZATION,
                'Organization name',
                settings?.[ORGANIZATION],
                true,
            ).setChoices(choises),
        );
    }

}
