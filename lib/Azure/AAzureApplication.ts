import { PowerBIEmbeddedManagementClient } from '@azure/arm-powerbiembedded';
import { ClientSecretCredential } from '@azure/identity';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';

const TENANT_ID = 'tenantId';
const CLIENT_ID = 'clientId';
const SECRET = 'secret';
const SUBSCRIPTION_ID = 'subscriptionId';

export default abstract class AAzureApplication extends ABasicApplication {

    public getAuthUrl(): string {
        return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TENANT_ID, 'Tenant key', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, SUBSCRIPTION_ID, 'Subscription id', undefined, true));

        return new FormStack().addForm(form);
    }

    public getClient(applicationInstall: ApplicationInstall): PowerBIEmbeddedManagementClient {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const credentials = new ClientSecretCredential(settings[TENANT_ID], settings[CLIENT_ID], settings[SECRET]);

        return new PowerBIEmbeddedManagementClient(credentials, settings[SUBSCRIPTION_ID]);
    }

}
