import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://bigquery.googleapis.com';

export default class BigQueryApplication extends AGoogle {
  public getBaseUrl = (): string => BASE_URL;

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Serverless, highly scalable, and cost-effective multicloud data warehouse designed for business agility';

  public getName = (): string => 'bigQuery';

  public getPublicName = (): string => 'BigQuery';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['https://www.googleapis.com/auth/bigquery'];
}
