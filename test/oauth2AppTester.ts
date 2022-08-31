/* eslint-disable import/first */
import runCli from '@orchesty/nodejs-sdk/dist/test/Testers/oauth2AppTester';
import OneDriveApplication from '../lib/OneDrive/OneDriveApplication';
import QuickBooksApplication from '../lib/QuickBooks/QuickBooksApplication';
import SalesForceApplication from '../lib/SalesForce/SalesForceApplication';
import TodoistApplication from '../lib/Todoist/TodoistApplication';
import TypeformApplication from '../lib/Typeform/TypeformApplication';
import XeroApplication from '../lib/Xero/XeroApplication';
import ZendeskApplication from '../lib/Zendesk/ZendeskApplication';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import { container, oauth2Provider, prepare } from './TestAbstract';

// Change this, if you need different host in redirectUri
process.env.BACKEND_URL = 'https://127.0.0.1';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
prepare()
    .then(() => {
    // Create an instance of OAuth2 Apps only!!

        container.setApplication(new QuickBooksApplication(oauth2Provider));
        container.setApplication(new ZohoApplication(oauth2Provider));
        container.setApplication(new ZendeskApplication(oauth2Provider));
        container.setApplication(new SalesForceApplication(oauth2Provider));
        container.setApplication(new TodoistApplication(oauth2Provider));
        container.setApplication(new XeroApplication(oauth2Provider));
        container.setApplication(new TypeformApplication(oauth2Provider));
        container.setApplication(new OneDriveApplication(oauth2Provider));
    })
    .then(async () => runCli(container, {}));
