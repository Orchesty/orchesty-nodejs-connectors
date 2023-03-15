import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ExpedicoGetTrackingInfo from '../../lib/Expedico/Batch/ExpedicoGetTrackingInfo';
import ExpedicoCreateParcel from '../../lib/Expedico/Connector/ExpedicoCreateParcel';
import ExpedicoGetCarriers from '../../lib/Expedico/Connector/ExpedicoGetCarriers';
import ExpedicoApplication from '../../lib/Expedico/ExpedicoApplication';
import { API_KEY, NAME } from '../../lib/GetResponse/GetResponseApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_KEY]: 'api_key',
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
