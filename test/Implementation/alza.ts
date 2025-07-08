import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AlzaApplication, { API, NAME as ALZA_APP, SERVER } from '../../lib/Alza/AlzaApplication';
import AlzaCancelOrderConnector from '../../lib/Alza/Connector/AlzaCancelOrderConnector';
import AlzaConfirmOrderConnector from '../../lib/Alza/Connector/AlzaConfirmOrderConnector';
import AlzaCreateShipmentConnector from '../../lib/Alza/Connector/AlzaCreateShipmentConnector';
import AlzaInsetrOrderConnector from '../../lib/Alza/Connector/AlzaInsetrOrderConnector';
import AlzaTrackAndTraceConnector from '../../lib/Alza/Connector/AlzaTrackAndTraceConnector';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
