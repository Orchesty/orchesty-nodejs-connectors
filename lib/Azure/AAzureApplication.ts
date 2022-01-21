import { SecretClient } from '@azure/keyvault-secrets';
import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ClientSecretCredential } from '@azure/identity';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { PowerBIEmbeddedManagementClient } from '@azure/arm-powerbiembedded';

const TENANT_ID = 'tenantId';
const CLIENT_ID = 'clientId';
const SECRET = 'secret';

export default abstract class AAzureApplication extends ABasicApplication {
  public getAuthUrl = (): string => 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';

  public getSettingsForm = (): Form => new Form()
    .addField((new Field(FieldType.TEXT, TENANT_ID, 'Tenant key', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_ID, 'Client key', undefined, true)))
    .addField((new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true)));

  public getClient = (applicationInstall: ApplicationInstall): SecretClient => {
    const settings = applicationInstall.getSettings()[FORM];
    const credentials = new ClientSecretCredential(settings[TENANT_ID], settings[CLIENT_ID], settings[SECRET]);

    const powerBiClient = new PowerBIEmbeddedManagementClient(credentials);

    return new SecretClient(this.getAuthUrl(), credentials);
  };
}
