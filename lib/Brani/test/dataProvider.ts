import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import BraniListSupplies from '../src/Batch/BraniListSupplies';
import BraniListWebhookEvents from '../src/Batch/BraniListWebhookEvents';
import BraniListWebhooks from '../src/Batch/BraniListWebhooks';
import BraniSubscribeWebhooks from '../src/Batch/BraniSubscribeWebhooks';
import BraniApplication, { NAME as BRANI_APP } from '../src/BraniApplication';
import BraniEshopInfo from '../src/Connector/BraniEshopInfo';
import BraniUnsubscribeWebhook from '../src/Connector/BraniUnsubscribeWebhook';
import BraniUpdateEshopInfo from '../src/Connector/BraniUpdateEshopInfo';
import BraniUpsertOrder from '../src/Connector/BraniUpsertOrder';
import BraniUpsertProduct from '../src/Connector/BraniUpsertProduct';

export function mock(): void {
    appInstall(BRANI_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: 'token',
        },
    });
}

export default function init(): void {
    mock();
    const app = new BraniApplication();
    container.setApplication(app);

    container.setNode(new BraniEshopInfo(), app);
    container.setNode(new BraniUpdateEshopInfo(), app);
    container.setNode(new BraniUpsertOrder(), app);
    container.setNode(new BraniSubscribeWebhooks(), app);
    container.setNode(new BraniListWebhooks(), app);
    container.setNode(new BraniListWebhookEvents(), app);
    container.setNode(new BraniUnsubscribeWebhook(), app);
    container.setNode(new BraniListSupplies(), app);
    container.setNode(new BraniUpsertProduct(), app);
}
