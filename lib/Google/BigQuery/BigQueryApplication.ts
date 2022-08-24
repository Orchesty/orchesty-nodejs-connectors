import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://bigquery.googleapis.com';

export default class BigQueryApplication extends AGoogle {

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'Serverless, highly scalable, and cost-effective multicloud data warehouse designed for business agility';
    }

    public getName(): string {
        return 'bigQuery';
    }

    public getPublicName(): string {
        return 'BigQuery';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/bigquery'];
    }

}
