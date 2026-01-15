import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import HeurekaAvailabilityFeedConnector from '../src/Connector/HeurekaAvailabilityFeedConnector';
import HeurekaProductFeedConnector from '../src/Connector/HeurekaProductFeedConnector';
import HeurekaFeedApplication, {
    AVAILABILITY_FEED_URL,
    NAME,
    PRODUCT_FEED_URL,
    SETTINGS,
} from '../src/HeurekaFeedApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [SETTINGS]: {
            [PRODUCT_FEED_URL]: 'https://path.to/xml',
            [AVAILABILITY_FEED_URL]: 'https://path.to/xml',
        },
    });

    const app = new HeurekaFeedApplication();
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
