import { container } from '@orchesty/nodejs-sdk';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import FlexiBeeFormaDopravyBatch from '../../lib/FlexiBee/Batch/FlexiBeeFormaDopravyBatch';
import FlexiBeeFormaUhradyBatch from '../../lib/FlexiBee/Batch/FlexiBeeFormaUhradyBatch';
import FlexiBeeGetSkladovyPohybBatch from '../../lib/FlexiBee/Batch/FlexiBeeGetSkladovyPohybBatch';
import FlexiBeeObjednavkaPrijataBatch from '../../lib/FlexiBee/Batch/FlexiBeeObjednavkaPrijataBatch';
import FlexiBeeObjednavkaVydanaBatch from '../../lib/FlexiBee/Batch/FlexiBeeObjednavkaVydanaBatch';
import FlexiBeeSkladoveKartyBatch from '../../lib/FlexiBee/Batch/FlexiBeeSkladoveKartyBatch';
import FlexiBeeStitkyBatch from '../../lib/FlexiBee/Batch/FlexiBeeStitkyBatch';
import FlexiBeeCreateObjednavkaVydanaConnector
    from '../../lib/FlexiBee/Connector/FlexiBeeCreateObjednavkaVydanaConnector';
import FlexiBeeCreateSkladovyPohybConnector from '../../lib/FlexiBee/Connector/FlexiBeeCreateSkladovyPohybConnector';
import FlexiBeeGetCenikKartyConnector from '../../lib/FlexiBee/Connector/FlexiBeeGetCenikKartyConnector';
import FlexiBeeGetSarzeExpiraceKartyConnector
    from '../../lib/FlexiBee/Connector/FlexiBeeGetSarzeExpiraceKartyConnector';
import FlexiBeeUpdateObjednavkaPrijataConnector
    from '../../lib/FlexiBee/Connector/FlexiBeeUpdateObjednavkaPrijataConnector';
import FlexiBeeUpdateSkladovyPohybConnector from '../../lib/FlexiBee/Connector/FlexiBeeUpdateSkladovyPohybConnector';
import FlexiBeeApplication, { FLEXI_BEE_APPLICATION, FLEXIBEE_URL } from '../../lib/FlexiBee/FexiBeeApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';

export function initFlexiBeeTest(): void {
    appInstall(FLEXI_BEE_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [FLEXIBEE_URL]: 'https://demo.flexibee.eu/c/demo',
            [USER]: 'user',
            [PASSWORD]: 'pwd',
            auth: 'http',
        },
    });

    const sender = container.get(CurlSender);
    const db = container.get(DatabaseClient);
    const app = container.setApplication(new FlexiBeeApplication(sender, db));

    container.setNode(
        (new FlexiBeeFormaDopravyBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeFormaUhradyBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeStitkyBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeSkladoveKartyBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeGetCenikKartyConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeGetSarzeExpiraceKartyConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeObjednavkaPrijataBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeObjednavkaVydanaBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeCreateSkladovyPohybConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeUpdateSkladovyPohybConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeCreateObjednavkaVydanaConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeUpdateObjednavkaPrijataConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeGetSkladovyPohybBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );
}
