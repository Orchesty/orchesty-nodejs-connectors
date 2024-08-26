import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import BraniListSupplies from '../../lib/Brani/Batch/BraniListSupplies';
import BraniListWebhooks from '../../lib/Brani/Batch/BraniListWebhooks';
import BraniSubscribeWebhooks from '../../lib/Brani/Batch/BraniSubscribeWebhooks';
import BraniApplication, { NAME as BRANI_APP } from '../../lib/Brani/BraniApplication';
import BraniEshopInfo from '../../lib/Brani/Connector/BraniEshopInfo';
import BraniUnsubscribeWebhook from '../../lib/Brani/Connector/BraniUnsubscribeWebhook';
import BraniUpsertOrder from '../../lib/Brani/Connector/BraniUpsertOrder';
import BraniUpsertProduct from '../../lib/Brani/Connector/BraniUpsertProduct';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
    container.setNode(new BraniUpsertOrder(), app);
    container.setNode(new BraniSubscribeWebhooks(), app);
    container.setNode(new BraniListWebhooks(), app);
    container.setNode(new BraniUnsubscribeWebhook(), app);
    container.setNode(new BraniListSupplies(), app);
    container.setNode(new BraniUpsertProduct(), app);
}
