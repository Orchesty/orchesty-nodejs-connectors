import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const KEY = 'Key';
export const SECRET = 'secret';
export const REGION = 'region';
export const VERSION = 'apiVersion';
export const ENDPOINT = 'endpoint';
export const CREDENTIALS = 'credentials';
/* eslint-disable @typescript-eslint/naming-convention */
export const REGIONS = [
    { 'us-east-2': 'US East (Ohio) - us-east-2' },
    { 'us-east-1': 'US East (N. Virginia) - us-east-1' },
    { 'us-west-1': 'US West (N. California) - us-west-1' },
    { 'us-west-2': 'US West (Oregon) - us-west-2' },
    { 'ap-east-1': 'Asia Pacific (Hong Kong) - ap-east-1' },
    { 'ap-south-1': 'Asia Pacific (Mumbai) - ap-south-1' },
    { 'ap-northeast-2': 'Asia Pacific (Seoul) - ap-northeast-2' },
    { 'ap-southeast-1': 'Asia Pacific (Singapore) - ap-southeast-1' },
    { 'ap-southeast-2': 'Asia Pacific (Sydney) - ap-southeast-2' },
    { 'ap-northeast-1': 'Asia Pacific (Tokyo) - ap-northeast-1' },
    { 'ca-central-1': 'Canada (Central) - ca-central-1' },
    { 'cn-north-1': 'China (Beijing) - cn-north-1' },
    { 'cn-northwest-1': 'China (Ningxia) - cn-northwest-1' },
    { 'eu-central-1': 'EU (Frankfurt) - eu-central-1' },
    { 'eu-west-1': 'EU (Ireland) - eu-west-1' },
    { 'eu-west-2': 'EU (London) - eu-west-2' },
    { 'eu-west-3': 'EU (Paris) - eu-west-3' },
    { 'eu-north-1': 'EU (Stockholm) - eu-north-1' },
    { 'me-south-1': 'Middle East (Bahrain) - me-south-1' },
    { 'sa-east-1': 'South America (Sao Paulo) - sa-east-1' },
    { 'us-gov-east-1': 'AWS GovCloud (US-East) - us-gov-east-1' },
    { 'us-gov-west-1': 'AWS GovCloud (US-West) - us-gov-west-1' },
];
/* eslint-enable @typescript-eslint/naming-convention */

export const LATEST = 'latest';

export default abstract class AAwsApplication extends ABasicApplication {

    public getRequestDto(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: string,
        url?: string,
        data?: unknown,
        /* eslint-enable @typescript-eslint/no-unused-vars */
    ): Promise<RequestDto> | RequestDto {
        throw new Error(`Method [${this.getRequestDto.name}] is not supported! Use getConnection method instead!`);
    }

}
