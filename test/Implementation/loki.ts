import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import LokiGetQueryListBatch from '../../lib/Loki/Batch/LokiGetQueryListBatch';
import LokiApplication, { NAME as LOKI_APPLICATION, URL_KEY } from '../../lib/Loki/LokiApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export default function init(): void {
    appInstall(LOKI_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [URL_KEY]: 'http://127.0.0.1:3100',
        },
    });

    const app = new LokiApplication();
    container.setApplication(app);

    container.setNode(new LokiGetQueryListBatch(), app);
}
