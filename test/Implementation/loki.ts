import LokiGetQueryListBatch from '../../lib/Loki/Batch/LokiGetQueryListBatch';
import LokiApplication, { NAME as LOKI_APPLICATION } from '../../lib/Loki/LokiApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export default function init(): void {
    appInstall(LOKI_APPLICATION, DEFAULT_USER, {});

    const app = new LokiApplication();
    container.setApplication(app);

    container.setNode(new LokiGetQueryListBatch(), app);
}
