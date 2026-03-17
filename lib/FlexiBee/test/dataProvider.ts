import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-sdk';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import FlexiBeeCleneniDphBatch from '../src/Batch/FlexiBeeCleneniDphBatch';
import FlexiBeeCleneniKontrolniHlaseniBatch from '../src/Batch/FlexiBeeCleneniKontrolniHlaseniBatch';
import FlexiBeeFormaDopravyBatch from '../src/Batch/FlexiBeeFormaDopravyBatch';
import FlexiBeeFormaUhradyBatch from '../src/Batch/FlexiBeeFormaUhradyBatch';
import FlexiBeeGetSkladovyPohybBatch from '../src/Batch/FlexiBeeGetSkladovyPohybBatch';
import FlexiBeeObjednavkaPrijataBatch from '../src/Batch/FlexiBeeObjednavkaPrijataBatch';
import FlexiBeeObjednavkaVydanaBatch from '../src/Batch/FlexiBeeObjednavkaVydanaBatch';
import FlexiBeePredpisZauctovaniBatch from '../src/Batch/FlexiBeePredpisZauctovaniBatch';
import FlexiBeeSkladoveKartyBatch from '../src/Batch/FlexiBeeSkladoveKartyBatch';
import FlexiBeeStitkyBatch from '../src/Batch/FlexiBeeStitkyBatch';
import FlexiBeeStrediskoBatch from '../src/Batch/FlexiBeeStrediskoBatch';
import FlexiBeeTypFakturyPrijateBatch from '../src/Batch/FlexiBeeTypFakturyPrijateBatch';
import FlexiBeeUcetBatch from '../src/Batch/FlexiBeeUcetBatch';
import FlexiBeeZakazkaBatch from '../src/Batch/FlexiBeeZakazkaBatch';
import FlexiBeeCreateFakturaPrijataConnector from '../src/Connector/FlexiBeeCreateFakturaPrijataConnector';
import FlexiBeeCreateFakturaPrijataPrilohaConnector
    from '../src/Connector/FlexiBeeCreateFakturaPrijataPrilohaConnector';
import FlexiBeeCreateObjednavkaVydanaConnector
    from '../src/Connector/FlexiBeeCreateObjednavkaVydanaConnector';
import FlexiBeeCreateSkladovyPohybConnector from '../src/Connector/FlexiBeeCreateSkladovyPohybConnector';
import FlexiBeeCreateZavazekConnector from '../src/Connector/FlexiBeeCreateZavazekConnector';
import FlexiBeeCreateZavazekPrilohaConnector
    from '../src/Connector/FlexiBeeCreateZavazekPrilohaConnector';
import FlexiBeeGetCenikKartyConnector from '../src/Connector/FlexiBeeGetCenikKartyConnector';
import FlexiBeeGetCompaniesConnector from '../src/Connector/FlexiBeeGetCompaniesConnector';
import FlexiBeeGetFakturaPrijataConnector from '../src/Connector/FlexiBeeGetFakturaPrijataConnector';
import FlexiBeeGetObjednavkaVydanaConnector from '../src/Connector/FlexiBeeGetObjednavkaVydanaConnector';
import FlexiBeeGetSarzeExpiraceKartyConnector
    from '../src/Connector/FlexiBeeGetSarzeExpiraceKartyConnector';
import FlexiBeeGetZavazekConnector from '../src/Connector/FlexiBeeGetZavazekConnector';
import FlexiBeeUpdateObjednavkaPrijataConnector
    from '../src/Connector/FlexiBeeUpdateObjednavkaPrijataConnector';
import FlexiBeeUpdateSkladovyPohybConnector from '../src/Connector/FlexiBeeUpdateSkladovyPohybConnector';
import FlexiBeeApplication, { FLEXI_BEE_APPLICATION, FLEXIBEE_URL } from '../src/FexiBeeApplication';

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
        (new FlexiBeeGetCompaniesConnector())
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
        (new FlexiBeeGetObjednavkaVydanaConnector())
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

    container.setNode(
        new FlexiBeeCreateFakturaPrijataConnector()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeGetFakturaPrijataConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        new FlexiBeeCreateFakturaPrijataPrilohaConnector()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        new FlexiBeeCreateZavazekConnector()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeGetZavazekConnector())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        new FlexiBeeCreateZavazekPrilohaConnector()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeStrediskoBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeZakazkaBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeUcetBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeePredpisZauctovaniBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeCleneniDphBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeCleneniKontrolniHlaseniBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    container.setNode(
        (new FlexiBeeTypFakturyPrijateBatch())
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );
}
