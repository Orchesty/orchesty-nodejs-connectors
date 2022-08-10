import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { ILimitedApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/ILimitedApplication';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const BASE_URL = 'https://api.myshoptet.com';

export default abstract class ABaseShoptet extends ABasicApplication implements ILimitedApplication {
  protected abstract _authorizationHeader: string;

  protected _limiter: IShoptetLimiter = {
    time: 1,
    amount: 3,
    groupTime: 1,
    groupAmount: 50,
  };

  constructor(
        private _runner: TopologyRunner,
  ) {
    super();
  }

  public injectLimit = (
    _dto: ProcessDto,
    appInstall: ApplicationInstall,
  ): ProcessDto => {
    const dto = _dto;
    dto.setLimiterWithGroup(
      `${appInstall.getUser()}|${appInstall.getName()}`,
      this._limiter.time,
      this._limiter.amount,
      appInstall.getName(),
      this._limiter.groupTime,
      this._limiter.groupAmount,
    );
    return dto;
  };

  public static shoptetDateISO = (
    date: string | Date,
    hourOffset?: number,
  ): string => {
    if (!date) {
      return '';
    }
    try {
      const newDate = new Date(date);
      if (hourOffset) {
        newDate.setMinutes(newDate.getMinutes() + hourOffset * 60);
      }

      return `${newDate.toISOString().split('.')[0]}Z`;
    } catch (e) {
      throw new Error(`${date} is not in the correct format`);
    }
  };

  protected async _startTopology(
    applicationInstall: ApplicationInstall,
    topology: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    await this._runner.runByName(
      data,
      topology,
      'Start',
      new ProcessDto(),
      applicationInstall.getUser(),
    );
  }
}

export interface IShoptetLimiter {
  time: number,
  amount: number,
  groupTime: number,
  groupAmount: number
}
