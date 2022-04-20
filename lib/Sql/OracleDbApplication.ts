import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import OracleDB from 'oracledb';
import ASqlApplication, { IDialect } from './Common/ASqlApplication';

export default class OracleDbApplication extends ASqlApplication {
  constructor() {
    super(IDialect.oracledb);
  }

  public async getConnection(appInstall: ApplicationInstall): Promise<OracleDB.Connection> {
    const appId = appInstall.getId();
    let oracleDb = this._cache.get(appId) as OracleDB.Connection;

    if (oracleDb === undefined) {
      oracleDb = await OracleDB.getConnection(this._getConfig(appInstall));
      this._cache.set(appId, oracleDb);
    }

    return oracleDb;
  }

  public getPublicName = (): string => 'OracleDB';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'An Oracle database is a collection of data treated as a unit.';

  // eslint-disable-next-line max-len
  // TODO
  public getLogo = (): string => '';
}
