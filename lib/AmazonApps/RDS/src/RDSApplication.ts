import { RDSClient } from '@aws-sdk/client-rds';
import AAwsApplication, {
    CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET,
} from '@orchesty/connector-amazon-apps-common/src/AAwsApplication';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';

export default class RDSApplication extends AAwsApplication {

    public getDescription(): string {
        return 'Distributed relational database service by Amazon Web Services. It is a web service running "in the cloud" designed to simplify the setup, operation, and scaling of a relational database for use in applications';
    }

    public getName(): string {
        return 'rds';
    }

    public getPublicName(): string {
        return 'Amazon RDS';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxQTQ3NkY7fQoJLnN0MXtmaWxsOiMxRjVCOTg7fQoJLnN0MntmaWxsOiMyRDcyQjg7fQoJLnN0M3tmaWxsOiM1Mjk0Q0Y7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNiw3Ny45TDE2LjMsOTBsMC45LTEuMVYxMS4zbC0wLjktMS4yTDYsMjIuM1Y3Ny45Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi4zLDkwbDE5LjgsOS45bDAuOC0xLjNsMC05Ny4zbC0wLjgtMWwtMTkuOCw5LjlWOTAiLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTk0LjQsMjIuM0w4NCwxMC4xbC0xLjIsMC40TDgzLjEsODlsMC45LDFsMTAuNC0xMi4xVjIyLjMiLz4KPHBhdGggY2xhc3M9InN0MyIgZD0iTTY0LjIsOTkuOUw4NCw5MFYxMC4xTDY0LjIsMC4zbC0wLjksMS4zbDAsOTYuOUw2NC4yLDk5LjkiLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTM2LjEsMC4zaDI4LjF2OTkuNkgzNi4xVjAuM3oiLz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true).setChoices(REGIONS));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[KEY] && authorizationForm?.[SECRET] && authorizationForm?.[REGION];
    }

    public getRDSClient(applicationInstall: ApplicationInstall): RDSClient {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return new RDSClient({
            [CREDENTIALS]: {
                accessKeyId: settings[KEY],
                secretAccessKey: settings[SECRET],
            },
            apiVersion: LATEST,
            region: settings[REGION],
        });
    }

}
