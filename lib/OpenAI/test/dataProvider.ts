import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import OpenAIPostResponseConnector from '../src/Connector/OpenAIPostResponseConnector';
import OpenAIApplication, { NAME as OPEN_AI_APPLICATION } from '../src/OpenAIApplication';

export default function init(): void {
    appInstall(OPEN_AI_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const app = new OpenAIApplication();
    container.setApplication(app);

    container.setNode(new OpenAIPostResponseConnector(), app);
}
