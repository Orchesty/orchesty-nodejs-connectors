import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AlzaApplication, { API, NAME as ALZA_APP, SERVER } from '../../lib/Alza/AlzaApplication';
import AlzaCancelOrderConnector from '../../lib/Alza/Connectors/AlzaCancelOrderConnector';
import AlzaConfirmOrderConnector from '../../lib/Alza/Connectors/AlzaConfirmOrderConnector';
import AlzaCreateShipmentConnector from '../../lib/Alza/Connectors/AlzaCreateShipmentConnector';
import AlzaInsetrOrderConnector from '../../lib/Alza/Connectors/AlzaInsetrOrderConnector';
import AlzaTrackAndTraceConnector from '../../lib/Alza/Connectors/AlzaTrackAndTraceConnector';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(ALZA_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
            [SERVER]: 'https://server.cz',
            [API]: 'api_path',
        },
    });

    const app = new AlzaApplication();
    container.setApplication(app);

    const createShipment = new AlzaCreateShipmentConnector();
    const insertOrder = new AlzaInsetrOrderConnector();
    const cancelOrder = new AlzaCancelOrderConnector();
    const confirmOrder = new AlzaConfirmOrderConnector();
    const trackAndTrace = new AlzaTrackAndTraceConnector();

    createShipment
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createShipment);

    insertOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(insertOrder);

    cancelOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(cancelOrder);

    confirmOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(confirmOrder);

    trackAndTrace
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(trackAndTrace);
}
