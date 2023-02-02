import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import HeurekaAvailabilityFeedConnector from '../../lib/Heureka/Connector/HeurekaAvailabilityFeedConnector';
import HeurekaProductFeedConnector from '../../lib/Heureka/Connector/HeurekaProductFeedConnector';
import HeurekaApplication, { AVAILABILITY_FEED_URL, NAME, PRODUCT_FEED_URL } from '../../lib/Heureka/HeurekaApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [PRODUCT_FEED_URL]: 'https://path.to/xml',
            [AVAILABILITY_FEED_URL]: 'https://path.to/xml',
        },
    });

    const app = new HeurekaApplication();
    container.setApplication(app);

    const heurekaProductFeedConnector = new HeurekaProductFeedConnector();

    heurekaProductFeedConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(heurekaProductFeedConnector);

    const heurekaAvailabilityFeedConnector = new HeurekaAvailabilityFeedConnector();

    heurekaAvailabilityFeedConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(heurekaAvailabilityFeedConnector);
}
