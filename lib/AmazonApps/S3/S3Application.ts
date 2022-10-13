import { S3Client } from '@aws-sdk/client-s3';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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

export const BUCKET = 'Bucket';

export default class S3Application extends AAwsApplication {

    public getDescription(): string {
        return 'Object storage service that offers industry-leading scalability, data availability, security, and performance';
    }

    public getName(): string {
        return 's3';
    }

    public getPublicName(): string {
        return 'Amazon S3';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM4QzMxMjM7fQoJLnN0MXtmaWxsOiNFMDUyNDM7fQoJLnN0MntmaWxsOiM1RTFGMTg7fQoJLnN0M3tmaWxsOiNGMkIwQTk7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNS4zLDE3LjRsLTYuNywzLjN2NTguNGw2LjcsMy4zbDAsMEwxNS4zLDE3LjRMMTUuMywxNy40eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTUxLDc0bC0zNS42LDguNVYxNy40TDUxLDI1LjdWNzR6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQuOSw2MC43TDUwLDYyLjZsMC4xLTAuMmwwLjEtMjQuOEw1MCwzNy41bC0xNS4xLDEuOVY2MC43eiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUwLDc0LjFsMzQuNyw4LjRsMC4xLTAuMWwwLTY1bC0wLjEtMC4xTDUwLDI1LjhWNzQuMXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik02NS4xLDYwLjdMNTAsNjIuNlYzNy41bDE1LjEsMS45VjYwLjd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNjUuMSwyOUw1MCwzMS44TDM0LjksMjlsMTUuMS00TDY1LjEsMjl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNjUuMSw3MUw1MCw2OC4zTDM0LjksNzFMNTAsNzUuMkw2NS4xLDcxeiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM0LjksMjlMNTAsMjUuM2wwLjEsMFYwLjJMNTAsMC4xTDM0LjksNy42VjI5eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTY1LjEsMjlMNTAsMjUuM1YwLjFsMTUuMSw3LjZWMjl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTAsMTAwbC0xNS4xLTcuNlY3MUw1MCw3NC44bDAuMiwwLjNsLTAuMSwyNC41TDUwLDEwMHoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01MCwxMDBsMTUuMS03LjZWNzFMNTAsNzQuOFYxMDB6IE04NC43LDE3LjRsNi43LDMuM3Y1OC40bC02LjcsMy4zVjE3LjR6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, BUCKET, 'Bucket', undefined, true))
            .addField(new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true).setChoices(REGIONS))
            .addField(new Field(FieldType.TEXT, ENDPOINT, 'Custom Endpoint'));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[KEY]
          && authorizationForm?.[SECRET]
          && authorizationForm?.[BUCKET]
          && authorizationForm?.[REGION]
          && authorizationForm?.[ENDPOINT];
    }

    public getS3Client(applicationInstall: ApplicationInstall): S3Client {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const endpoint = settings[ENDPOINT];

        return new S3Client(
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
