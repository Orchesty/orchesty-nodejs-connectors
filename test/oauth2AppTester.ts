import runCli from '@orchesty/nodejs-sdk/dist/test/Testers/oauth2AppTester';
import QuickBooksApplication from '../lib/QuickBooks/QuickBooksApplication';
import { container, oauth2Provider, prepare } from './TestAbstract';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import ZendeskApplication from '../lib/Zendesk/ZendeskApplication';
import SalesForceApplication from '../lib/SalesForce/SalesForceApplication';
import TodoistApplication from '../lib/Todoist/TodoistApplication';

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
  })
  .then(async () => runCli(container, {}));
