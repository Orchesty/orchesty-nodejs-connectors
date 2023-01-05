import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import MerkGetCompanyConnector from '../../lib/Merk/Connector/MerkGetCompanyConnector';
import MerkSuggestConnector from '../../lib/Merk/Connector/MerkSuggestConnector';
import MerkApplication, { API_KEY, NAME as MERK_APP } from '../../lib/Merk/MerkApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

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
