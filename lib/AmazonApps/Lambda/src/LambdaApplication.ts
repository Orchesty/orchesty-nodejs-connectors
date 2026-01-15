import { LambdaClient } from '@aws-sdk/client-lambda';
import AAwsApplication, {
    CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET,
} from '@orchesty/connector-amazon-apps-common/src/AAwsApplication';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';

export default class LambdaApplication extends AAwsApplication {

    public getDescription(): string {
        return 'Compute service that lets you run code without provisioning or managing servers';
    }

    public getName(): string {
        return 'lambda';
    }

    public getPublicName(): string {
        return 'Amazon Lambda';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM5RDUwMjU7fQoJLnN0MXtmaWxsOiNGNjg1MzY7fQoJLnN0MntmaWxsOiM2QjNBMTk7fQoJLnN0M3tmaWxsOiNGQkJGOTM7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjcsNzkuMmw1LjMsMi42bDAuOS0xLjVWMTkuM0wxNCwxOC4xbC01LjMsMi42Vjc5LjIiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNC4xLDIwLjZMMTQsMTguMXY2My43bDEwLjEtMi40VjIwLjYiLz4KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01NS4xLDI1LjVsNy4yLTMuN2wyNCw5LjNsLTYuNCwwLjhMNTUuMSwyNS41Ii8+Cgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNTUuNCw3NC41bDcuMSwzLjdsMjQtOS4zbC02LjQtMC44TDU1LjQsNzQuNSIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU3LjIsNjQuM2wxMi42LDEuN2wwLjctMS4zdi0yOWwtMC43LTEuNWwtMTIuNiwxLjdWNjQuMyBNMjAuMiwxNC45bDcuOC0zLjlsMC44LDEuNnY3NC41TDI4LDg4LjlsLTcuOC0zLjkKCQlWMTQuOSIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTQzLjgsODMuN0wyOCw4OC44VjExLjFsMTUuOCw1LjFWODMuNyIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM3LjcsOTMuN0w1MCw5OS45bDEuMy0xLjVWMS45TDUwLDAuMUwzNy43LDYuM1Y5My43IE03OS43LDMxLjhMODYsMzFsMC41LDAuOHYzNi40TDg2LDY5LjFsLTYuNC0wLjhWMzEuOCIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTY5LjgsMzQuMXYzMkw4Myw1MEw2OS44LDM0LjEiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NiwxOC4xbC0zNi0xOHY5OS44bDQxLjMtMjAuNlYyMC44TDg2LDE4LjF6IE04Niw2OS4ybC0yMy43LDcuMVYyMy44TDg2LDMwLjhWNjkuMnoiLz4KPC9nPgo8L3N2Zz4K';
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

    public getLambdaClient(applicationInstall: ApplicationInstall): LambdaClient {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return new LambdaClient({
            [CREDENTIALS]: {
                accessKeyId: settings[KEY],
                secretAccessKey: settings[SECRET],
            },
            apiVersion: LATEST,
            region: settings[REGION],
        });
    }

}
