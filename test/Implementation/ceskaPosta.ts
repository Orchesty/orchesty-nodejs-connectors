import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import CeskaPostaApplication, {
    API_TOKEN,
    NAME as CESKAPOSTA_APP,
    SECRET_KEY,
} from '../../lib/CeskaPosta/CeskaPostaApplication';
import CeskaPostaGetSendParcelsConnector from '../../lib/CeskaPosta/Connector/CeskaPostaGetSendParcelsConnector';
import CeskaPostaParcelPrintingConnector from '../../lib/CeskaPosta/Connector/CeskaPostaParcelPrintingConnector';
import CeskaPostaParcelStatusConnector from '../../lib/CeskaPosta/Connector/CeskaPostaParcelStatusConnector';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
