import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import {
  appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER,
} from '../DataProvider';

import {
  container, db, oauth2Provider, sender,
} from '../TestAbstract';

import MYOBApplication, { NAME } from '../../lib/MYOB/MYOBApplication';
import MYOBGetEmployeeBatch from '../../lib/MYOB/Batch/MYOBGetEmployeeBatch';

export default async function init(): Promise<void> {
  await appInstall(NAME, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });

  const app = new MYOBApplication(oauth2Provider);
  container.setApplication(app);

  const getEmployee = new MYOBGetEmployeeBatch();

  getEmployee
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(getEmployee);
}
