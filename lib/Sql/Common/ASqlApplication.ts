import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BodyInit } from 'node-fetch';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { Dialect, Options, Sequelize } from 'sequelize';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import OracleDB, { ConnectionAttributes } from 'oracledb';

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
  protected _cache: Record<string, Sequelize | OracleDB.Pool> = {};

  protected constructor(private _dialect: IDialect) {
    super();
  }

  public getName = (): string => this._dialect.toString();

  public getRequestDto = (
    /* eslint-disable @typescript-eslint/no-unused-vars */
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): RequestDto => {
    throw new Error('Unsupported use GetConnection method instead');
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, HOST, 'Host', undefined, true))
    .addField(new Field(FieldType.TEXT, PORT, 'Port', undefined, true))
    .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
    .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true))
    .addField(new Field(FieldType.TEXT, DATABASE, 'Database', undefined, true));

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getConnection(appInstall: ApplicationInstall): Promise<Sequelize | OracleDB.Connection> {
    const appId = appInstall.getId();
    let sequelize = this._cache[appId] as Sequelize;

    if (sequelize === undefined) {
      sequelize = new Sequelize(this._getConfig(appInstall));
      this._cache[appId] = sequelize;
    }

    return sequelize;
  }

  protected _getConfig = (appInstall: ApplicationInstall): Options | ConnectionAttributes => {
    const formSettings = appInstall.getSettings()[FORM];
    switch (this._dialect) {
      case IDialect.sqlite:
        return {
          storage: formSettings[HOST],
          database: formSettings[DATABASE],
          port: formSettings[PORT],
          username: formSettings[USER],
          password: formSettings[PASSWORD],
          dialect: this._dialect,
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
          dialect: this._dialect,
        };
      case IDialect.oracledb:
        return {
          user: formSettings[USER],
          password: formSettings[PASSWORD],
          connectString: `${formSettings[HOST]}:${formSettings[PORT]}/${formSettings[DATABASE]}`,
        };
      default: throw new Error(`Dialect [${this._dialect}] is not compatible!`);
    }
  };

  private _capitalizeFirstLetterOfDialect = (dialect: Dialect) => dialect.charAt(0)
    .toUpperCase() + dialect.slice(1);
}
