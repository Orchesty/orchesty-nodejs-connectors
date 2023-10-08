import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import WorklogsListBatch from '../../lib/Tempo/Batch/WorklogsListBatch';
import CreateWorklogConnector from '../../lib/Tempo/Connector/CreateWorklogConnector';
import UpdateWorklogConnector from '../../lib/Tempo/Connector/UpdateWorklogConnector';
import TempoApplication, { NAME } from '../../lib/Tempo/TempoApplication';
import {
    appInstall,
    DEFAULT_USER,
} from '../DataProvider';
import { container } from '../TestAbstract';

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
