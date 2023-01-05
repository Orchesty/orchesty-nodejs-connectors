import { SESClient } from '@aws-sdk/client-ses';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AAwsApplication, {
    CREDENTIALS,
    ENDPOINT,
    KEY,
    LATEST,
    REGION,
    REGIONS,
    SECRET,
    VERSION,
} from '../AAwsApplication';

export default class SESApplication extends AAwsApplication {

    public getName(): string {
        return 'amazon-ses';
    }

    public getPublicName(): string {
        return 'Amazon Simple Email Service';
    }

    public getDescription(): string {
        return 'Cloud email service provider that can integrate into any application for bulk email sending and supports a variety of deployments including dedicated, shared, or owned IP addresses';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDg5LjU2IDgxLjU4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6Izg3NjkyOTt9LmNscy0ye2ZpbGw6I2Q5YTc0MTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjQuODUsMjQuNTQsMy42Niw1MC44OCwyNC44NSw3Ny4yM2wuMzYtLjIxLS4yNy01Mi40My0uMDktLjA1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy42NiAtMTEuNTMpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDguNTEsNzIuNSwyNC44NSw3Ny4yM1YyNC41NGwyMy42Niw0LjczVjcyLjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zLjY2IC0xMS41MykiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05My4yMSwzMS4xN2wtMTEuNCwxLjQ3TDU1LjYzLDExLjUzLDQyLjYxLDE2bDEuNzIsMi41LTkuMjIsMi44N1Y4Ny44OGwxMy40LDUuMjMuMjItLjE0TDQ4LjUyLDI0LjYsNzYuOTEsNTguMmwxNi4zLTI3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy42NiAtMTEuNTMpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTUuNjMsMTEuNTMsOTAuNSwyNS4xNSw3Ni43MSw0NC42OSw1NS42MywxMS41MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMuNjYgLTExLjUzKSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTkzLjIxLDMxLjE3Vjc1LjYzTDQ4LjUxLDkzLjExVjE3LjE4bDI4LjIxLDQwLDE2LjUtMjYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zLjY2IC0xMS41MykiLz48L3N2Zz4=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true).setChoices(REGIONS))
            .addField(new Field(FieldType.TEXT, ENDPOINT, 'Custom Endpoint'));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[KEY]
          && authorizationForm?.[SECRET]
          && authorizationForm?.[REGION];
    }

    public getSESClient(applicationInstall: ApplicationInstall): SESClient {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const endpoint = settings[ENDPOINT];

        return new SESClient(
            [
                {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    [CREDENTIALS]: {
                        KEY: settings[KEY],
                        SECRET: settings[SECRET],
                    },
                    [REGION]: settings[REGION],
                    [VERSION]: LATEST,
                    [ENDPOINT]: endpoint ? settings[ENDPOINT] : [],
                },
                /* eslint-enable @typescript-eslint/naming-convention */
            ],
        );
    }

}
