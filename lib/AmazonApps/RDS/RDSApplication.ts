import { RDSClient } from '@aws-sdk/client-rds';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AAwsApplication, {
    CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET,
} from '../AAwsApplication';

export default class RDSApplication extends AAwsApplication {

    public getDescription(): string {
        return 'Web service that makes it easier to set up, operate, and scale a relational database in the cloud';
    }

    public getName(): string {
        return 'rds';
    }

    public getPublicName(): string {
        return 'Amazon RDS';
    }

    // eslint-disable-next-line max-len
    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true).setChoices(REGIONS));

        return new FormStack().addForm(form);
    }

    public getRDSClient(applicationInstall: ApplicationInstall): RDSClient {
        const settings = applicationInstall.getSettings()[AUTHORIZATION_FORM];

        return new RDSClient({
            [CREDENTIALS]: {
                accessKeyId: settings[KEY],
                secretAccessKey: settings[SECRET],
            },
            apiVersion: LATEST,
            region: settings[REGION],
        });
    }

}
