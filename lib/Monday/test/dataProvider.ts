import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import MondayCreateBoardConnector from '../src/Connector/MondayCreateBoardConnector';
import MondayCreateGroupConnector from '../src/Connector/MondayCreateGroupConnector';
import MondayCreateItemConnector from '../src/Connector/MondayCreateItemConnector';
import MondayApplication, { API_KEY, NAME as MONDAY_APP } from '../src/MondayApplication';

export default function init(): void {
    appInstall(MONDAY_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
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
