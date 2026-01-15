import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AlzaApplication, { API, NAME as ALZA_APP, SERVER } from '../src/AlzaApplication';
import AlzaCancelOrderConnector from '../src/Connector/AlzaCancelOrderConnector';
import AlzaConfirmOrderConnector from '../src/Connector/AlzaConfirmOrderConnector';
import AlzaCreateShipmentConnector from '../src/Connector/AlzaCreateShipmentConnector';
import AlzaInsetrOrderConnector from '../src/Connector/AlzaInsetrOrderConnector';
import AlzaTrackAndTraceConnector from '../src/Connector/AlzaTrackAndTraceConnector';

export default function init(): void {
    appInstall(ALZA_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
            [SERVER]: 'https://server.cz',
            [API]: 'api_path',
        },
    });

    const app = new AlzaApplication();
    container.setApplication(app);

    container.setNode(new AlzaCreateShipmentConnector(), app);
    container.setNode(new AlzaInsetrOrderConnector(), app);
    container.setNode(new AlzaCancelOrderConnector(), app);
    container.setNode(new AlzaConfirmOrderConnector(), app);
    container.setNode(new AlzaTrackAndTraceConnector(), app);
}
