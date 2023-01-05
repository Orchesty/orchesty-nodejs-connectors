import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import OracleDB, { ConnectionAttributes } from 'oracledb';
import { Options, Sequelize } from 'sequelize';

const HOST = 'host';
const PORT = 'port';
const DATABASE = 'database';

export enum IDialect {
    /* eslint-disable @typescript-eslint/naming-convention */
    mysql = 'mysql',
    postgres = 'postgres',
    sqlite = 'sqlite',
    mariadb = 'mariadb',
    mssql = 'mssql',
    oracledb = 'oracledb',
    /* eslint-enable @typescript-eslint/naming-convention */
}

export default abstract class ASqlApplication extends ABasicApplication {

    protected cache: Record<string, OracleDB.Pool | Sequelize> = {};

    protected constructor(private readonly dialect: IDialect) {
        super();
    }

    public getName(): string {
        return this.dialect.toString();
    }

    public getRequestDto(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
        /* eslint-enable @typescript-eslint/no-unused-vars */
    ): RequestDto {
        throw new Error('Unsupported use GetConnection method instead');
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, HOST, 'Host', undefined, true))
            .addField(new Field(FieldType.TEXT, PORT, 'Port', undefined, true))
            .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true))
            .addField(new Field(FieldType.TEXT, DATABASE, 'Database', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[HOST]
          && authorizationForm?.[PORT]
          && authorizationForm?.[USER]
          && authorizationForm?.[PASSWORD]
          && authorizationForm?.[DATABASE];
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async getConnection(appInstall: ApplicationInstall): Promise<OracleDB.Connection | Sequelize> {
        const appId = appInstall.getId();
        let sequelize = this.cache[appId] as Sequelize;

        if (sequelize === undefined) {
            sequelize = new Sequelize(this.getConfig(appInstall));
            this.cache[appId] = sequelize;
        }

        return sequelize;
    }

    protected getConfig(appInstall: ApplicationInstall): ConnectionAttributes | Options {
        const formSettings = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        switch (this.dialect) {
            case IDialect.sqlite:
                return {
                    storage: formSettings[HOST],
                    database: formSettings[DATABASE],
                    port: formSettings[PORT],
                    username: formSettings[USER],
                    password: formSettings[PASSWORD],
                    dialect: this.dialect,
                };
            case IDialect.mariadb:
            case IDialect.mssql:
            case IDialect.mysql:
            case IDialect.postgres:
                return {
                    host: formSettings[HOST],
                    database: formSettings[DATABASE],
                    port: formSettings[PORT],
                    username: formSettings[USER],
                    password: formSettings[PASSWORD],
                    dialect: this.dialect,
                };
            case IDialect.oracledb:
                return {
                    user: formSettings[USER],
                    password: formSettings[PASSWORD],
                    connectString: `${formSettings[HOST]}:${formSettings[PORT]}/${formSettings[DATABASE]}`,
                };
            default:
                throw new Error(`Dialect [${this.dialect}] is not compatible!`);
        }
    }

}
