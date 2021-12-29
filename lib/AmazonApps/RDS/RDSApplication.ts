import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { RDSClient } from '@aws-sdk/client-rds';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AAwsApplication, {
  CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET,
} from '../AAwsApplication';

export default class RDSApplication extends AAwsApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the cloud. ';

  public getName = (): string => 'rds';

  public getPublicName = (): string => 'Amazon RDS';

  public getSettingsForm = (): Form => new Form()
    .addField((new Field(FieldType.TEXT, KEY, 'Key', undefined, true)))
    .addField((new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true)))
    .addField((new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true)).setChoices(REGIONS));

  public getRDSClient = (applicationInstall: ApplicationInstall): RDSClient => {
    const settings = applicationInstall.getSettings()[FORM];

    return new RDSClient({
      [CREDENTIALS]: {
        accessKeyId: settings[KEY],
        secretAccessKey: settings[SECRET],
      },
      apiVersion: LATEST,
      region: settings[REGION],
    });
  };
}
