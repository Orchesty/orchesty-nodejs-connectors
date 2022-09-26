import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import DigitooDocumentsByStatusBatch from '../../lib/Digitoo/Batch/DigitooDocumentsByStatusBatch';
import DigitooAddRegisters from '../../lib/Digitoo/Connector/DigitooAddRegisters';
import DigitooMarkAsExported from '../../lib/Digitoo/Connector/DigitooMarkAsExported';
import DigitooMarkAsExportErrored from '../../lib/Digitoo/Connector/DigitooMarkAsExportErrored';
import DigitooApplication, { DIGITOO_URL, NAME as DIGITOO_APP } from '../../lib/Digitoo/DigitooApplication';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_USER,
} from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(DIGITOO_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
            [DIGITOO_URL]: 'https://api.digitoo.cz/',
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
}
