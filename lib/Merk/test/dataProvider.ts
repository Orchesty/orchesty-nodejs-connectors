import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import MerkGetCompanyConnector from '../src/Connector/MerkGetCompanyConnector';
import MerkSuggestConnector from '../src/Connector/MerkSuggestConnector';
import MerkApplication, { API_KEY, NAME as MERK_APP } from '../src/MerkApplication';

export default function init(): void {
    appInstall(MERK_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_KEY]: 'Api key',
        },
    });

    const app = new MerkApplication();
    container.setApplication(app);

    const getCompany = new MerkGetCompanyConnector();
    const getSuggest = new MerkSuggestConnector();
    getCompany
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getCompany);

    getSuggest
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getSuggest);
}
