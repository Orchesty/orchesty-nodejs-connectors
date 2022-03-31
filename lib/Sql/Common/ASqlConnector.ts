import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';
import { ConnectionError } from 'sequelize';
import logger from 'pipes-nodejs-sdk/dist/lib/Logger/Logger';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ResultCode from 'pipes-nodejs-sdk/dist/lib/Utils/ResultCode';
import SqlErrorEnum from '../Enums/SqlErrorEnum';
import ASqlApplication from './ASqlApplication';

export const NAME = 'sql-connector';

export default abstract class ASqlConnector extends ACommonNode {
  protected abstract _name: string;

  protected abstract _processResult(res: unknown, dto: ProcessDto): Promise<ProcessDto> | ProcessDto;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const query = this._getQuery(dto);
    const { userName } = dto.jsonData as { userName: string };
    const appInstall = await this._getApplicationInstall(userName);
    const app = this._application as ASqlApplication;
    try {
      return this._processResult(app.getConnection(appInstall).query(query), dto);
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

  protected abstract _getQuery(processDto: ProcessDto): string;

  public getName(): string {
    return `${this._name}-${NAME}`;
  }
}
