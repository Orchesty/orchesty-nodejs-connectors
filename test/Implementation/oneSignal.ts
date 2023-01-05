import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import OnesignalViewAppsBatch from '../../lib/Onesignal/Batch/OnesignalViewAppsBatch';
import OnesignalCreateAppConnector from '../../lib/Onesignal/Connector/OnesignalCreateAppConnector';
import OnesignalApplication, { NAME as ONESIGNAL_APP, REST_API_KEY } from '../../lib/Onesignal/OnesignalApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(ONESIGNAL_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [REST_API_KEY]: 'Api key',
        },
    });

    const app = new OnesignalApplication();
    container.setApplication(app);

    const viewsApps = new OnesignalViewAppsBatch();
    const createApp = new OnesignalCreateAppConnector();

    createApp
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createApp);

    viewsApps
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(viewsApps);
}
