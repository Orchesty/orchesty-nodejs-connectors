import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import LokiGetQueryListBatch from '../src/Batch/LokiGetQueryListBatch';
import LokiApplication, { NAME as LOKI_APPLICATION, URL_KEY } from '../src/LokiApplication';

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
