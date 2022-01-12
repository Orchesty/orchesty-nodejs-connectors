import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import AAwsApplication, {
  CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET,
} from '../AAwsApplication';

export default class LambdaApplication extends AAwsApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Lambda is a compute service that lets you run code without provisioning or managing servers';

  public getName = (): string => 'lambda';

  public getPublicName = (): string => 'Amazon Lambda';

  public getSettingsForm = (): Form => new Form()
    .addField((new Field(FieldType.TEXT, KEY, 'Key', undefined, true)))
    .addField((new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true)))
    .addField((new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true)).setChoices(REGIONS));

  public getLambdaClient = (applicationInstall: ApplicationInstall): LambdaClient => {
    const settings = applicationInstall.getSettings()[FORM];

    return new LambdaClient({
      [CREDENTIALS]: {
        accessKeyId: settings[KEY],
        secretAccessKey: settings[SECRET],
      },
      apiVersion: LATEST,
      region: settings[REGION],
    });
  };
}
