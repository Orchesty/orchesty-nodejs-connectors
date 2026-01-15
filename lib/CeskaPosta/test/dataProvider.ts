import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import CeskaPostaApplication, {
    API_TOKEN,
    NAME as CESKAPOSTA_APP,
    SECRET_KEY,
} from '../src/CeskaPostaApplication';
import CeskaPostaGetSendParcelsConnector from '../src/Connector/CeskaPostaGetSendParcelsConnector';
import CeskaPostaParcelPrintingConnector from '../src/Connector/CeskaPostaParcelPrintingConnector';
import CeskaPostaParcelStatusConnector from '../src/Connector/CeskaPostaParcelStatusConnector';

export default function init(): void {
    appInstall(CESKAPOSTA_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_TOKEN]: DEFAULT_ACCESS_TOKEN,
            [SECRET_KEY]: 'secret key',
        },
    });

    const app = new CeskaPostaApplication();
    container.setApplication(app);

    container.setNode(new CeskaPostaParcelStatusConnector(), app);
    container.setNode(new CeskaPostaGetSendParcelsConnector(), app);
    container.setNode(new CeskaPostaParcelPrintingConnector(), app);
}
