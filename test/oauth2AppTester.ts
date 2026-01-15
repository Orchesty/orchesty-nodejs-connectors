/* eslint-disable import/no-relative-packages */
import runCli from '@orchesty/nodejs-sdk/dist/test/Testers/oauth2AppTester';
import OneDriveApplication from '../lib/OneDrive/src/OneDriveApplication';
import QuickBooksApplication from '../lib/QuickBooks/src/QuickBooksApplication';
import SalesForceApplication from '../lib/SalesForce/src/SalesForceApplication';
import TodoistApplication from '../lib/Todoist/src/TodoistApplication';
import TypeformApplication from '../lib/Typeform/src/TypeformApplication';
import XeroApplication from '../lib/Xero/src/XeroApplication';
import ZendeskApplication from '../lib/Zendesk/src/ZendeskApplication';
import ZohoApplication from '../lib/Zoho/src/ZohoApplication';
import { container, db, oauth2Provider, prepare, sender } from './TestAbstract';

// Change this, if you need different host in redirectUri
process.env.BACKEND_URL = 'https://127.0.0.1';

prepare();
container.setApplication(new QuickBooksApplication(oauth2Provider, db, sender));
container.setApplication(new ZohoApplication(oauth2Provider));
container.setApplication(new ZendeskApplication(oauth2Provider));
container.setApplication(new SalesForceApplication(oauth2Provider));
container.setApplication(new TodoistApplication(oauth2Provider));
container.setApplication(new XeroApplication(oauth2Provider, db, sender));
container.setApplication(new TypeformApplication(oauth2Provider));
container.setApplication(new OneDriveApplication(oauth2Provider));

// eslint-disable-next-line @typescript-eslint/no-floating-promises
runCli(container, {}).then().catch();
