import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import AAzureApplication from '../AAzureApplication';

export const NAME = 'power-bi';

export default class PowerBiApplication extends AAzureApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Execute event-driven serverless code with an end-to-end development experience';

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Microsoft Azure';

  public getRequestDto(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): RequestDto | Promise<RequestDto> {
    throw new Error(`Method [${this.getRequestDto.name}] is not supported! Use getConnection method instead!`);
  }
}
