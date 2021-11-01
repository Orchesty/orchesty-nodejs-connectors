import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { RedshiftClient } from '@aws-sdk/client-redshift';
import { Client } from 'pg';
import AAwsApplication, {
  CREDENTIALS, KEY, REGION, REGIONS, SECRET, VERSION,
} from '../AAwsApplication';

const ENDPOINT = 'Endpoint';
const DB_PASSWORD = 'DbPassword';

const HOST = 'host';
const PORT = 'Port';
const DBNAME = 'DBName';
const ADDRESS = 'Address';
const MASTER_USER = 'MasterUsername';
const CLUSTER_IDENTIFIER = 'ClusterIdentifier';

export default class RedshiftApplication extends AAwsApplication {
  getDescription = (): string => 'Amazon Redshift is a fast, simple, cost-effective data warehousing service.';

  getName = (): string => 'redshift';

  getPublicName = (): string => 'Amazon Redshift';

  getSettingsForm = (): Form => {
    const form = new Form();
    form
      .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
      .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
      .addField(new Field(FieldType.PASSWORD, DB_PASSWORD, 'Database Password', undefined, true))
      .addField((new Field(FieldType.SELECT_BOX, REGION, 'Region', '', true)).setChoices(REGIONS));

    return form;
  };

  public getRedshiftClient(applicationInstall: ApplicationInstall): RedshiftClient {
    const settings = applicationInstall.getSettings()[FORM];

    return new RedshiftClient([
      /* eslint-disable @typescript-eslint/naming-convention */
      {
        [CREDENTIALS]: {
          KEY: settings[KEY],
          SECRET: settings[SECRET],
        },
      },
      {
        [REGION]:
          settings[REGION],
      },
      {
        [VERSION]:
        this._LATEST,
      },
    ]);
  }

  public getConnection = async (applicationInstall: ApplicationInstall): Promise<Client> => {
    const settings = applicationInstall.getSettings();
    const host = settings[HOST];
    const port = settings[PORT];
    const dbname = settings[DBNAME];
    const user = settings[MASTER_USER];
    const password = settings[DB_PASSWORD];

    const client = new Client(`host=${host} port=${port} dbname=${dbname} user=${user} password=${password}`);
    try {
      await client.connect();
    } catch (e) {
      throw new Error('Connection to Redshift db was unsuccessful.');
    }
    return client;
  };
}
