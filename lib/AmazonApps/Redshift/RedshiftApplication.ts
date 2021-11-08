import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import {
  DescribeClustersCommand, DescribeClustersCommandInput, DescribeClustersCommandOutput,
  RedshiftClient,
} from '@aws-sdk/client-redshift';
import { Client } from 'pg';
import AAwsApplication, {
  CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET, VERSION,
} from '../AAwsApplication';

const DB_PASSWORD = 'DbPassword';

const HOST = 'host';
const PORT = 'Port';
const DBNAME = 'DBName';
const MASTER_USER = 'MasterUsername';

export default class RedshiftApplication extends AAwsApplication {
  public getDescription = (): string => 'Amazon Redshift is a fast, simple, cost-effective data warehousing service.';

  public getName = (): string => 'redshift';

  public getPublicName = (): string => 'Amazon Redshift';

  public getSettingsForm = (): Form => {
    const form = new Form();
    form
      .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
      .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
      .addField(new Field(FieldType.PASSWORD, DB_PASSWORD, 'Database Password', undefined, true))
      .addField((new Field(FieldType.SELECT_BOX, REGION, 'Region', '', true)).setChoices(REGIONS));

    return form;
  };

  public getRedshiftClient = (applicationInstall: ApplicationInstall): RedshiftClient => {
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
        LATEST,
      },
    ]);
  };

  public async setApplicationSettings(
    _applicationInstall: ApplicationInstall,
    settings: [],
  ): Promise<ApplicationInstall> {
    const applicationInstall = await super.setApplicationSettings(_applicationInstall, settings);

    const input: DescribeClustersCommandInput = {};
    const command = new DescribeClustersCommand(input);
    const response = await this.getRedshiftClient(applicationInstall)
      .send(command) as DescribeClustersCommandOutput;

    if (!response.Clusters) {
      throw new Error('Login into application was unsuccessful.');
    }

    const cluster = response.Clusters[0];

    return applicationInstall.setSettings(
      {
        CLUSTER_IDENTIFIER: cluster.ClusterIdentifier,
        MASTER_USER: cluster.MasterUsername,
        DB_PASSWORD: applicationInstall.getSettings()[FORM][DB_PASSWORD],
        DBNAME: cluster.DBName,
        HOST: cluster.Endpoint?.Address,
        PORT: cluster.Endpoint?.Port,
      },
    );
  }

  public getConnection = async (applicationInstall: ApplicationInstall): Promise<Client> => {
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
      throw new Error('Connection to Redshift db was unsuccessful.');
    }
    return client;
  };
}
