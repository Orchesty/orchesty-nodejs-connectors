import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';
import { ConnectionError, Sequelize } from 'sequelize';
import logger from 'pipes-nodejs-sdk/dist/lib/Logger/Logger';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ResultCode from 'pipes-nodejs-sdk/dist/lib/Utils/ResultCode';
import OracleDB, { ExecuteOptions } from 'oracledb';
import SqlErrorEnum from '../Enums/SqlErrorEnum';
import ASqlApplication from './ASqlApplication';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ACommonNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown, dto: ProcessDto): Promise<ProcessDto> | ProcessDto;

  protected abstract _getQuery(processDto: ProcessDto): Promise<string> | string;

  protected _getExecuteOptions = (): ExecuteOptions => ({ outFormat: OracleDB.OUT_FORMAT_OBJECT });

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const query = await this._getQuery(dto);
    const { userName } = dto.jsonData as { userName: string };
    const appInstall = await this._getApplicationInstall(userName);
    const app = this._application as ASqlApplication;
    try {
      const conn = await (app.getConnection(appInstall));
      if (conn instanceof Sequelize) {
        return this._processResult(conn.query(query), dto);
      }

      return this._processResult(conn.execute(query, [], this._getExecuteOptions), dto);
    } catch (e) {
      if (e instanceof ConnectionError) {
        logger.error(e.message, { data: query });
        switch (e.message) {
          case SqlErrorEnum.TOO_MANY_CONNECTIONS:
            throw new OnRepeatException(60, 10, e.message);
          default:
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
            break;
        }
      } else if (e instanceof Error) {
        logger.error(e.message, { data: query });
        dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
      }

      return dto;
    }
  }

  public getName(): string {
    return `${this._name}-${NAME}`;
  }
}
