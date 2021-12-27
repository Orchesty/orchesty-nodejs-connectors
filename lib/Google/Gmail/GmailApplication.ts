import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://gmail.googleapis.com';

export default class GmailApplication extends AGoogle {
  public getBaseUrl = (): string => BASE_URL;

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'The Gmail application lets you view and manage Gmail mailbox data like threads, messages, and labels.';

  public getName = (): string => 'google-gmail';

  public getPublicName = (): string => 'GoogleGmail';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['https://www.googleapis.com/auth/gmail.compose'];
}
