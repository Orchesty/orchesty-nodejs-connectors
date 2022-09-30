import {
    DescribeClustersCommand,
    DescribeClustersCommandInput,
    RedshiftClient,
} from '@aws-sdk/client-redshift';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { Client } from 'pg';
import AAwsApplication, {
    CREDENTIALS,
    KEY,
    LATEST,
    REGION,
    REGIONS,
    SECRET,
    VERSION,
} from '../AAwsApplication';

const DB_PASSWORD = 'DbPassword';

const HOST = 'host';
const PORT = 'Port';
const DBNAME = 'DBName';
const MASTER_USER = 'MasterUsername';

export default class RedshiftApplication extends AAwsApplication {

    public getDescription(): string {
        return 'Fast, simple, cost-effective data warehousing service';
    }

    public getName(): string {
        return 'redshift';
    }

    public getPublicName(): string {
        return 'Amazon Redshift';
    }

    public getLogo(): string {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABk8AAAb4CAMAAAARQLQAAAABvFBMVEUAAAAA//8AgIAAgP+AgP8AQIBmmcxJkttgn78aZpkrVZUnYp0kW5IgYI9Qj89LltJVks4hWZsdWJMiXplVkcwhWpRSlM4eWpYjXJVOlc0eWZRTlNAhWZYgWpVQlc8eWpZQkc1Slc8iWZlRlcwwdLcvcrgiWpZTks4hWZhPks0+gLogWphQk88hWpZRk88qa6ZHiMExeLo1cq8hXJhRks4hW5chWpZQlM0gXJhQk88gWpZRlM4gXJdSk80gXJhRks4gW5dRlM4kY6MgXJhSk89DhsQwbKkfW5dQks4gXJhRk85Cgr4gXJZSlM4fW5dRk88fW5dQk84sb7QhW5dRk84saaUhW5dRlM5FhsEgW5dRk84saKRFhcEuc7Yuc7ctcbVRk88gW5YgW5cudLgtcLMscLRRk85Rk84tcLMfW5cscLMgW5cscLMwdbggW5cgW5hRk84gW5cscLMsb7NRlM1Rk84sbrJRk84gW5csb7FGisYgW5cgWpcgW5crb7FRk84gW5csbrFRk85Rk85Rk84gW5cgW5crbbErbrFRk84gW5cqZqIrbrEuc7dHiMNHisdJi8hOkc1Rk87///9ONrAnAAAAinRSTlMAAQICAgQFBwgKDA0OEBARFRcaHh4fHyIkJCsrLjAwMzM1PDxAQURETU1OT1BVVVZWWVxeXmVmZm9vd3eAgIiIkZGVmZmcoKKiqqqtsrKzs7u7vsTEyszMztXV1tba3N3d3uDh4ubm6Onr6+3t7e7v7/Dw8fLz9fX29vb3+Pn5+fr6+vv8/f7+/v7Atxl9AAAAAWJLR0ST4QPftgAAIgBJREFUeNrt2luPXXUdx+HVdhfCqQiUnqYWAU0gUpsoIkHRcOGFkXvfGe/BVyAJMXphiAmJoViIQcC2tLQOLT2gaLWCbdcAPcxh773+5//zJBxL0s5v1qxPJ1+2DZDDA0f23OcKMdx176Uv/vhXdyC9mROQwX1Hnj349vfcIZZjToCe0E1NhmGnQ0Tzi11vXnIFUtvhBKSuyQ9ffm7Xtb9+ststYrn/u9/eefGKO5DWNicgw/cm1x1/0jVi2X7tN4on3/A9CnpCDzUZhrMr7hGzJ4qCntBHTYbh3F4XidsTRUFP6KEmw/CPB90kdk8UBT2h/ZoMw//ucpX4PVEU9ITWa3LtnefhS9ITRUFPaLsmepKuJ4qCntByTfQkZU8UBT2h3ZroSdqeKAp6Qqs10ZPUPVEU9IQ2a6In6XuiKOgJLdZET3L0RFHQE9qriZ7k6YmioCe0VhM9ydUTRUFPaKsmepKvJ4qCntBSTfQkZ08UBT2hnZroSd6eKAp6Qis10ZPcPVEU9IQ2aqIn+XuiKOgJLdRET0roiaKgJ9RfEz0poyeKgp5Qe030pJSeKAp6Qt010ZNyeqIo6Ak110RPSuqJoqAn1FsTPSmrJ4qCnlBrTfSktJ4oCnpCnTXRk/J6oijoCTXWRE9K7ImioCfUVxM9KbMnioKeUFtN9KTUnigKekJdNdGTcnuiKOgJNdVET0ruiaKgJ9RTEz0puyeKgp5QS030pPSeKAp6Qh010ZPye6Io6Ak11ERPauiJoqAnlF8TPamjJ4qCnlB6TfSklp4oCnpC2TXRk3p6oijoCSXXRE9q6omioCeUWxM9qasnioKeUGpN9KS2nigKekKZNdGT+nqiKOgJJdZET2rsiaKgJ5RXEz2psyeKgp5QWk30pNaeKAp6Qlk10ZN6e6Io6Akl1URPau6JoqAnlFMTPam7J4qCnlBKTfSk9p4oCnpCGTXRk/p7oijoCSXURE9a6ImioCfkr4metNETRUFPyF0TPWmlJ4qCnpC3JnrSTk8UBT0hZ030pKWeKAp6Qr6a6ElbPVEU9ERNctVET1rriaLgS1pN9ERPFAU9od6a6EmLPVEUPUFN9ERPFAU9oc6a6EmrPVEUPUFN9ERPFAU9ob6a6EnLPVEUPUFN9ERPFAU9oa6a6EnrPVEUPUFN9ERPFAU9oZ6a6EkPPVEUPUFN9ERPFAU9oY6a6EkvPVEUPUFN9ERPFAU9ofya6ElPPVEUPUFN9ERPFAU9oeya6ElvPVEUPUFN9ERPFAU9UZOi33kevu56oih6gproiZ4oCnqiJnqiJ4qCntBuTfSk354oip6gJnqiJ4qCnqiJnuiJoqAntFgTPem9J4qiJ6iJnuiJoqAnaqIneqIo6Alt1URP9ERR9AQ10RM9URT0RE30RE8UBT2hpZroiZ4oip6gJnqiJ4qCnqiJnuiJoqAntFQTPdETRdET1ERP9ERR0BM10RM9URT0hJZqoid6oih6gproiZ4oCnqiJnqiJ4qCntBSTfRETxRFT1ATPdETRUFP1ERP9ERR0BM1aakmeqIniqInqIme6ImioCdqoid6oijoiZroCT32RFH0BDXREz1RFD1BTfRETxQFPVETPdGTFj8qRdET1ERP9ERR9AQ10RM9URT0RE30RE8UBT1Rk9Zroid6oih6gproiZ4oCnqiJnqiJ4qCnqiJnqAniqInqIme6Imi6Alqoid6oijoiZroiZ4oCnqiJnqCniiKnqAmeqIniqInqIme6ImioCdqoid60ttHrCh6Qr810RM9URQ9QU30RE8UBT1REz3RE0VBT9RET9ATRdET1ERP9ERR9IQI9v1qpft3nodPT6L44NdnPAJ5njsnyOPuFTeAKJ642w30BAA9AUBPAEBPANATAPQEAPQEAD0BQE8A0BMA0BMA9AQAPQFATwBATwDQEwD0BAA9AQA9AUBPANATAPQEAPQEAD0BQE8AQE8A0BMA9AQAPQEAPQFATwDQEwD0BAD0BAA9AUBPANATANATAPQEAD0BAD0BQE8A0BMA9AQA9AQAPQFATwDQEwDQEwD0BAA9AUBPAEBPANATAPQEAD0BAD0BQE8A0BMA0BMA9AQAPQFATwBATwDQEwD0BAA9AQA9AUBPANATAPQEAPQEAD0BQE8A0BMA0BMA9AQAPQEAPQFATwDQEwD0BAD0BAA9AUBPANATANATAPQEAD0BQE8AQE8A0BMA9AQAPQEAPQFATwDQEwDQEwD0BAA9AUBPAEBPANATAPQEAD0BAD0BQE8A0BMA9AQA9AQAPQFATwDQEwDQEwD0BAA9AQA9AUBPANATAPQEAPQEAD0BQE8A0JP4dvgkADTwLp1l/vkPHn7w6serpy97FgCWdc/+fbvvvvrm33ruycHDL87eemEYLr+zunryomcCYFH3H9j36NO7huHoiy/9Lm9Rcvbkek3Gv9v1/LU//enshVOnPRsA83p45ZE9R3Z+9Y8v5S1Kvp58XZM137/2x7FTF86cuuohAdjC3oPfOPT07f8ya1Fy9eSOmoyeeWYYTr5/bvX4FQ8LwPp2Htj/0LceX//HMhYlT082qMno0KFhOP2+kR7gTten9yf3b/ZfZCtKjp5sWpPRyoqRHuBWX07vW8lUlPQ9maMmIyM9wJdum95LLErqnsxdkzVGeqB7607v5RUlbU8WrcnISA/0arPpvbSipOzJcjUZGemB3mw9vZdVlHQ9mVKTkZEe6MW803tJRUnVk+k1GRnpgdYtNr2XU5Q0PQlVkzVGeqBRy0zvpRQlRU8C12RkpAfaMmF6L6Mo8XsSpSYjIz3QhsnTewlFid2TiDUZGemBugWa3vMXJe7LPnpNRkZ6oE5Bp/fcRYn5uk9UkzVGeqAqEab3vEWJ98JPW5ORkR6oQbzpPWdRYr3yc9RkZKQHShZ7es9XlDgv/Xw1GRnpgRKlmd5zFSXGaz93TUZGeqAkKaf3PEUJ/+IvoyZrjPRAAdJP7zmKEvrVX1RNRkZ6IJ9s03v6ooR9+RdYk5GRHkgv8/SeuighX//F1mRkpAfSKWJ6T1uUcAEovCYjIz0QX0HTe8qihEpAFTVZY6QHoiluek9XlDARqKkmIyM9EFqp03uqooTIQH01GRnpgVDKnt7TFGV6CGqtychID0xVw/SeoihTU1B3TUZGemBZ9Uzv8YsyLQYt1GSNkR5YUG3Te+yiTMlBQzUZGemB+VQ6vcctyvJBaK4mIyM9sLmqp/eYRVk2CY3WZGSkB9bXwPQeryjLRaHpmoyM9MCtmpneYxVlmSx0UJM1Rnrghsam9zhFWTwM/dRkZKSHvrU5vccoyqJp6K0mIyM99Knl6T18URaLQ581GRnpoS/tT++hi7JIHnquychID33oZXoPW5T5A6Ema4z00LS+pveQRZk3EWpyCyM9tKjL6T1cUeaLhJqsw0gPLel4eg9VlHkyoSYbMtJDC7qf3sMUZetQqMkWjPRQM9N7sKJslQo1mY+RHipkeg9alJmaBGOkh3qY3sMXZaYmQRnpoXym9zhFmalJcEZ6KJfpPV5RZmoShZEeymN6j1uUmZrEY6SHYpje4xdlpiZxGekhN9N7oqLM1CQ+Iz3kYnpPWJSZmqRhpIfUTO+JizJTk3SM9JCK6T1DUWZqktjaSG9OgVju/YHpPUtRtmWvyVvPdfl5uOr/+dq+zZdjtNvu6PrDv/JFlx/20R9l+WlvKsrM9yYABPgeZaYmAAQoykxNAAhQlJmaABCgKLOXX1ATACYW5fk/zH7qDABMdc/PtzsCAAHoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegIAegKAngCgJwDoCQDoCQB6AoCeAKAnAKAnAOgJAHoCgJ4AgJ4AoCcA6AkAegIAegKAngCgJwCgJwDoCQB6AoCeAICeAKAnAOgJAHoCAHoCgJ4AoCcA6AkA6AkAegKAngCgJwCgJwDoCQB6AgB6AoCeAKAnAOgJAOgJAHoCgJ4AoCcAoCcA6AkAegKAngCAngCgJwDoCQB6AgB6AoCeAKAnAKAn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';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, KEY, 'Key', undefined, true))
            .addField(new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, DB_PASSWORD, 'Database Password', undefined, true))
            .addField(new Field(FieldType.SELECT_BOX, REGION, 'Region', '', true).setChoices(REGIONS));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[KEY]
          && authorizationForm?.[SECRET]
          && authorizationForm?.[REGION]
          && authorizationForm?.[DB_PASSWORD];
    }

    public getRedshiftClient(applicationInstall: ApplicationInstall): RedshiftClient {
        const settings = applicationInstall.getSettings()[AUTHORIZATION_FORM];

        return new RedshiftClient([
            /* eslint-disable @typescript-eslint/naming-convention */
            {
                [CREDENTIALS]: {
                    KEY: settings[KEY],
                    SECRET: settings[SECRET],
                },
            },
            {
                [REGION]:
                    settings[REGION],
            },
            {
                [VERSION]:
                LATEST,
            },
        ]);
    }

    public async saveApplicationForms(
        _applicationInstall: ApplicationInstall,
        settings: [],
    ): Promise<ApplicationInstall> {
        const applicationInstall = await super.saveApplicationForms(_applicationInstall, settings);

        const input: DescribeClustersCommandInput = {};
        const command = new DescribeClustersCommand(input);
        const response = await this.getRedshiftClient(applicationInstall)
            .send(command);

        if (!response.Clusters) {
            throw new Error('Login into application was unsuccessful.');
        }

        const cluster = response.Clusters[0];

        return applicationInstall.setSettings(
            {
                CLUSTER_IDENTIFIER: cluster.ClusterIdentifier,
                MASTER_USER: cluster.MasterUsername,
                DB_PASSWORD: applicationInstall.getSettings()[AUTHORIZATION_FORM][DB_PASSWORD],
                DBNAME: cluster.DBName,
                HOST: cluster.Endpoint?.Address,
                PORT: cluster.Endpoint?.Port,
            },
        );
    }

    public async getConnection(applicationInstall: ApplicationInstall): Promise<Client> {
        const settings = applicationInstall.getSettings();

        const client = new Client({
            user: settings[MASTER_USER],
            host: settings[HOST],
            database: settings[DBNAME],
            password: settings[DB_PASSWORD],
            port: settings[PORT],
        });
        try {
            await client.connect();
        } catch (e) {
            throw new Error('Connection to Redshift db was unsuccessful.');
        }
        return client;
    }

}
