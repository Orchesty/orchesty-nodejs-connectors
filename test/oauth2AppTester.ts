import runCli from '@orchesty/nodejs-sdk/dist/test/Testers/oauth2AppTester';
import QuickBooksApplication from '../lib/QuickBooks/QuickBooksApplication';
import { container, oauth2Provider, prepare } from './TestAbstract';

prepare()
  .then(() => {
    // Create an instance of OAuth2 Apps only!!

    const quickApp = new QuickBooksApplication(oauth2Provider);
    container.setApplication(quickApp);
  })
  .then(async () => runCli(container));
