import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import WedoGetPackageBatch from '../../lib/Wedo/Batch/WedoGetPackageBatch';
import WedoApplication, { NAME as WEDO_APP } from '../../lib/Wedo/WedoApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(WEDO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,

        },
    });

    const app = new WedoApplication();
    container.setApplication(app);

    const getPackage = new WedoGetPackageBatch();

    getPackage
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getPackage);
}
