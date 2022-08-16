import runCli from '@orchesty/nodejs-sdk/dist/test/Testers/oauth2AppTester';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import QuickBooksApplication from '../lib/QuickBooks/QuickBooksApplication';
import { container, oauth2Provider, prepare } from './TestAbstract';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import ZendeskApplication, { SUBDOMAIN } from '../lib/Zendesk/ZendeskApplication';

// Change this, if you need different host in redirectUri
process.env.BACKEND_URL = 'https://127.0.0.1';

prepare()
  .then(() => {
    // Create an instance of OAuth2 Apps only!!

    container.setApplication(new QuickBooksApplication(oauth2Provider));
    container.setApplication(new ZohoApplication(oauth2Provider));
    container.setApplication(new ZendeskApplication(oauth2Provider));
  })
  .then(async () => runCli(container, { [AUTHORIZATION_FORM]: { [SUBDOMAIN]: 'hbtest8393' } }));
