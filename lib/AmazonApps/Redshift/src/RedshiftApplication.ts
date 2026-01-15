import {
    Cluster,
    DescribeClustersCommand,
    DescribeClustersCommandInput,
    RedshiftClient,
} from '@aws-sdk/client-redshift';
import AAwsApplication, {
    CREDENTIALS,
    KEY,
    LATEST,
    REGION,
    REGIONS,
    SECRET,
    VERSION,
} from '@orchesty/connector-amazon-apps-common/src/AAwsApplication';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { Client } from 'pg';

const DB_PASSWORD = 'DbPassword';

const HOST = 'host';
const PORT = 'Port';
const DBNAME = 'DBName';
const MASTER_USER = 'MasterUsername';

export default class RedshiftApplication extends AAwsApplication {

    public getDescription(): string {
        return 'Fast, simple, cost-effective data warehousing service';
    }

    public getName(): string {
        return 'redshift';
    }

    public getPublicName(): string {
        return 'Amazon Redshift';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM1Mjk0Q0Y7fQoJLnN0MXtmaWxsOiMyMDVCOTk7fQoJLnN0MntmaWxsOiMyRTczQjg7fQo8L3N0eWxlPgo8ZyBpZD0iUGFnZS0xIj4KCTxnIGlkPSJhbWF6b24tcmVkc2hpZnQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuODQwMDAwLCAwLjcwMjEyOCkiPgoJCTxwb2x5Z29uIGlkPSJTaGFwZSIgY2xhc3M9InN0MCIgcG9pbnRzPSI4NC44LDEzLjIgOTEuOCwxNi45IDkxLjgsODEuMyA4NC44LDg1IDczLjYsNDkuMiAJCSIvPgoJCTxwb2x5Z29uIGlkPSJTaGFwZV8xXyIgY2xhc3M9InN0MSIgcG9pbnRzPSIxMy42LDEzLjIgNi41LDE2LjkgNi41LDgxLjMgMTMuNiw4NSAzMS40LDQ5LjIgCQkiLz4KCQk8cG9seWdvbiBpZD0iU2hhcGVfMl8iIGNsYXNzPSJzdDEiIHBvaW50cz0iNDkuMyw3NS44IDg0LjgsODUgODQuOCwxMy4yIDQ5LjMsMjIuNSAJCSIvPgoJCTxwb2x5Z29uIGlkPSJTaGFwZV8zXyIgY2xhc3M9InN0MCIgcG9pbnRzPSI0OS4zLDc1LjggMTMuNSw4NSAxMy41LDEzLjIgNDkuMywyMi41IAkJIi8+CgkJPHBvbHlnb24gaWQ9IlNoYXBlXzRfIiBjbGFzcz0ic3QwIiBwb2ludHM9IjU3LjcsOTkuMyA3MS40LDkyLjEgNzEuNCw2LjUgNTcuNywtMC43IDQ0LjIsNDYuOCAJCSIvPgoJCTxwb2x5Z29uIGlkPSJTaGFwZV81XyIgY2xhc3M9InN0MSIgcG9pbnRzPSI0MC42LDk5LjMgMjYuOSw5Mi4xIDI2LjksNi41IDQwLjYsLTAuNyA1Mi44LDQ5LjMgCQkiLz4KCQk8cmVjdCBpZD0iUmVjdGFuZ2xlLXBhdGgiIHg9IjQwLjciIHk9Ii0wLjciIGNsYXNzPSJzdDIiIHdpZHRoPSIxNi45IiBoZWlnaHQ9IjEwMCIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, DB_PASSWORD, 'Database Password', undefined, true))
            .addField(new Field(FieldType.SELECT_BOX, REGION, 'Region', '', true).setChoices(REGIONS));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[KEY]
          && authorizationForm?.[SECRET]
          && authorizationForm?.[REGION]
          && authorizationForm?.[DB_PASSWORD];
    }

    public getRedshiftClient(applicationInstall: ApplicationInstall): RedshiftClient {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return new RedshiftClient(
            {
                [CREDENTIALS]: {
                    accessKeyId: settings[KEY],
                    secretAccessKey: settings[SECRET],
                },
                [REGION]: settings[REGION],
                [VERSION]: LATEST,
            },

        );
    }

    public async saveApplicationForms(
        _applicationInstall: ApplicationInstall,
        settings: [],
    ): Promise<ApplicationInstall> {
        const applicationInstall = await super.saveApplicationForms(_applicationInstall, settings);

        const input: DescribeClustersCommandInput = {};
        const command = new DescribeClustersCommand(input);
        const response = await this.getRedshiftClient(applicationInstall)
            .send(command);

        if (!response.Clusters) {
            throw new Error('Login into application was unsuccessful.');
        }

        const cluster = response.Clusters.shift() as Cluster;

        return applicationInstall.setSettings(
            {
                /* eslint-disable @typescript-eslint/naming-convention */
                CLUSTER_IDENTIFIER: cluster.ClusterIdentifier,
                MASTER_USER: cluster.MasterUsername,
                DB_PASSWORD: applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][DB_PASSWORD],
                DBNAME: cluster.DBName,
                HOST: cluster.Endpoint?.Address,
                PORT: cluster.Endpoint?.Port,
                /* eslint-enable @typescript-eslint/naming-convention */
            },
        );
    }

    public async getConnection(applicationInstall: ApplicationInstall): Promise<Client> {
        const settings = applicationInstall.getSettings();

        const client = new Client({
            user: settings[MASTER_USER],
            host: settings[HOST],
            database: settings[DBNAME],
            password: settings[DB_PASSWORD],
            port: settings[PORT],
        });
        try {
            await client.connect();
        } catch (e) {
            throw new Error('Connection to Redshift db was unsuccessful.', { cause: e });
        }
        return client;
    }

}
