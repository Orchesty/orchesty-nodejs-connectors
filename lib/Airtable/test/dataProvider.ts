import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AirtableApplication, { BASE_ID, NAME, TABLE_NAME } from '../src/AirtableApplication';
import AirtableNewRecordConnector from '../src/Connector/AirtableNewRecordConnector';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: 'token',
            [BASE_ID]: 'base_id',
            [TABLE_NAME]: 'table',
        },
    });
    const app = new AirtableApplication();
    container.setApplication(app);

    container.setNode(new AirtableNewRecordConnector(), app);
}
