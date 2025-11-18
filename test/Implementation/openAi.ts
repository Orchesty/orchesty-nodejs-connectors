import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import OpenAIPostResponseConnector from '../../lib/OpenAI/Connector/OpenAIPostResponseConnector';
import OpenAIApplication, { NAME as OPEN_AI_APPLICATION } from '../../lib/OpenAI/OpenAIApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
