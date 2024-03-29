import { PowerBIEmbeddedManagementClient } from '@azure/arm-powerbiembedded';
import { ClientSecretCredential } from '@azure/identity';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';

const TENANT_ID = 'tenantId';
const CLIENT_ID = 'clientId';
const SECRET = 'secret';
const SUBSCRIPTION_ID = 'subscriptionId';
export const ORGANIZATION = 'organization';

export default abstract class AAzureApplication extends AOAuth2Application {

    public getAuthUrl(): string {
        return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, TENANT_ID, 'Tenant key', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, SUBSCRIPTION_ID, 'Subscription id', undefined, true))
            .addField(new Field(FieldType.TEXT, ORGANIZATION, 'Organization', undefined, true));

        return new FormStack().addForm(form);
    }

    public getClient(applicationInstall: ApplicationInstall): PowerBIEmbeddedManagementClient {
        const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const credentials = new ClientSecretCredential(settings[TENANT_ID], settings[CLIENT_ID], settings[SECRET]);

        return new PowerBIEmbeddedManagementClient(credentials, settings[SUBSCRIPTION_ID]);
    }

}
