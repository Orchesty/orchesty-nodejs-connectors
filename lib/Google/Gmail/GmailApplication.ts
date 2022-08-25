import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://gmail.googleapis.com';
export const NAME = 'google-gmail';

export default class GmailApplication extends AGoogle {

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'The Gmail application lets you view and manage Gmail mailbox data like threads, messages, and labels.';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Gmail';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/gmail.compose'];
    }

}
