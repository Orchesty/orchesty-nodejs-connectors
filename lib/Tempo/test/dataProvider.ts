import {
    appInstall,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import WorklogsListBatch from '../src/Batch/WorklogsListBatch';
import CreateWorklogConnector from '../src/Connector/CreateWorklogConnector';
import UpdateWorklogConnector from '../src/Connector/UpdateWorklogConnector';
import TempoApplication, { NAME } from '../src/TempoApplication';

export function mock(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: 'Token',
        },
    });
}

export function init(): void {
    const tempoApplication = new TempoApplication();

    container.setNode(new WorklogsListBatch(), tempoApplication);
    container.setNode(new CreateWorklogConnector(), tempoApplication);
    container.setNode(new UpdateWorklogConnector(), tempoApplication);
}
