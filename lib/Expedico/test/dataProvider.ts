import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ExpedicoGetTrackingInfo from '../src/Batch/ExpedicoGetTrackingInfo';
import ExpedicoCreateParcel from '../src/Connector/ExpedicoCreateParcel';
import ExpedicoGetCarriers from '../src/Connector/ExpedicoGetCarriers';
import ExpedicoApplication, { NAME } from '../src/ExpedicoApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const app = new ExpedicoApplication(false);
    container.setApplication(app);

    const expedicoCreateParcel = new ExpedicoCreateParcel()
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(expedicoCreateParcel);

    const expedicoGetCarriers = new ExpedicoGetCarriers()
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(expedicoGetCarriers);

    container.setNode(new ExpedicoGetTrackingInfo(), app);
}
