import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import DigitooDocumentsByStatusBatch from '../src/Batch/DigitooDocumentsByStatusBatch';
import DigitooAddRegisters from '../src/Connector/DigitooAddRegisters';
import DigitooGetDocument from '../src/Connector/DigitooGetDocument';
import DigitooMarkAsExported from '../src/Connector/DigitooMarkAsExported';
import DigitooMarkAsExportErrored from '../src/Connector/DigitooMarkAsExportErrored';
import DigitooApplication, { NAME as DIGITOO_APP } from '../src/DigitooApplication';

export default function init(): void {
    appInstall(DIGITOO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });
    appInstall(DIGITOO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new DigitooApplication();
    container.setApplication(app);

    const digitooAddRegisters = new DigitooAddRegisters();
    digitooAddRegisters
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(digitooAddRegisters);

    const digitooMarkAsExported = new DigitooMarkAsExported();
    digitooMarkAsExported
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(digitooMarkAsExported);

    const digitooMarkAsExportErrored = new DigitooMarkAsExportErrored();
    digitooMarkAsExportErrored
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(digitooMarkAsExportErrored);

    const digitooDocumentsByStatusBatch = new DigitooDocumentsByStatusBatch();
    digitooDocumentsByStatusBatch
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(digitooDocumentsByStatusBatch);

    const digitooGetDocument = new DigitooGetDocument();
    digitooGetDocument
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(digitooGetDocument);
}
