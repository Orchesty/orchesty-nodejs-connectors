import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import MondayApplication, { API_KEY, NAME as MONDAY_APP } from '../../lib/Monday/MondayApplication';
import { container, db, sender } from '../TestAbstract';
import MondayCreateGroupConnector from '../../lib/Monday/Connector/MondayCreateGroupConnector';
import MondayCreateBoardConnector from '../../lib/Monday/Connector/MondayCreateBoardConnector';
import MondayCreateItemConnector from '../../lib/Monday/Connector/MondayCreateItemConnector';

export default async function init(): Promise<void> {
  await appInstall(MONDAY_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'Api key',
    },
  });

  const app = new MondayApplication();
  container.setApplication(app);

  const createGroup = new MondayCreateGroupConnector();
  const createBoard = new MondayCreateBoardConnector();
  const createItem = new MondayCreateItemConnector();
  createBoard
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createBoard);
  createGroup
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createGroup);
  createItem
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createItem);
}
