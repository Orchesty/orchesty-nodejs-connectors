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
import { Options, Sequelize } from 'sequelize';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import NodeCache from 'node-cache';

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
  /* eslint-enable @typescript-eslint/naming-convention */
}

export default abstract class ASqlApplication extends ABasicApplication {
  private _cache: NodeCache;

  protected constructor(private _dialect: IDialect) {
    super();
    this._cache = new NodeCache({ stdTTL: 300 });
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
    .addField(new Field(FieldType.NUMBER, PORT, 'Port', undefined, true))
    .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
    .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true))
    .addField(new Field(FieldType.TEXT, DATABASE, 'Database', undefined, true));

  public getConnection(appInstall: ApplicationInstall): Sequelize {
    const appId = appInstall.getId();
    let sequelize = this._cache.get(appId) as Sequelize;

    if (sequelize === undefined) {
      sequelize = new Sequelize(this._getConfig(appInstall));
      this._cache.set(appId, sequelize);
    }

    return sequelize;
  }

  private _getConfig = (appInstall: ApplicationInstall): Options => {
    const formSettings = appInstall.getSettings()[FORM];
    if (this._dialect === IDialect.sqlite) {
      return {
        storage: formSettings[HOST],
        database: formSettings[DATABASE],
        port: formSettings[PORT],
        username: formSettings[USER],
        password: formSettings[PASSWORD],
        dialect: this._dialect,
      };
    }
    return {
      host: formSettings[HOST],
      database: formSettings[DATABASE],
      port: formSettings[PORT],
      username: formSettings[USER],
      password: formSettings[PASSWORD],
      dialect: this._dialect,
    };
  };

  private _capitalizeFirstLetterOfDialect = (dialect: IDialect) => dialect.charAt(0)
    .toUpperCase() + dialect.slice(1);
}
