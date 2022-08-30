/* eslint-disable import/first */
import runCli from '@orchesty/nodejs-sdk/dist/test/Testers/oauth2AppTester';
import TypeformApplication from '../lib/Typeform/TypeformApplication';
import QuickBooksApplication from '../lib/QuickBooks/QuickBooksApplication';
import { container, oauth2Provider, prepare } from './TestAbstract';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import ZendeskApplication from '../lib/Zendesk/ZendeskApplication';
import SalesForceApplication from '../lib/SalesForce/SalesForceApplication';
import TodoistApplication from '../lib/Todoist/TodoistApplication';
import XeroApplication from '../lib/Xero/XeroApplication';
import OneDriveApplication from '../lib/OneDrive/OneDriveApplication';

// Change this, if you need different host in redirectUri
process.env.BACKEND_URL = 'https://127.0.0.1';

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
