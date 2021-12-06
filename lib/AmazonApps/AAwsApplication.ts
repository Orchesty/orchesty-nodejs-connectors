import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { BodyInit } from 'node-fetch';

export const KEY = 'Key';
export const SECRET = 'secret';
export const REGION = 'region';
export const VERSION = 'version';
export const ENDPOINT = 'endpoint';
export const CREDENTIALS = 'credentials';
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

export const LATEST = 'latest';

export default abstract class AAwsApplication extends ABasicApplication {
  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMDQgMTgyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDQgMTgyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojMjUyRjNFO30NCgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGOTkwMDt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTg2LjQsNjYuNGMwLDMuNywwLjQsNi43LDEuMSw4LjljMC44LDIuMiwxLjgsNC42LDMuMiw3LjJjMC41LDAuOCwwLjcsMS42LDAuNywyLjNjMCwxLTAuNiwyLTEuOSwzbC02LjMsNC4yDQoJCWMtMC45LDAuNi0xLjgsMC45LTIuNiwwLjljLTEsMC0yLTAuNS0zLTEuNEM3Ni4yLDkwLDc1LDg4LjQsNzQsODYuOGMtMS0xLjctMi0zLjYtMy4xLTUuOWMtNy44LDkuMi0xNy42LDEzLjgtMjkuNCwxMy44DQoJCWMtOC40LDAtMTUuMS0yLjQtMjAtNy4yYy00LjktNC44LTcuNC0xMS4yLTcuNC0xOS4yYzAtOC41LDMtMTUuNCw5LjEtMjAuNmM2LjEtNS4yLDE0LjItNy44LDI0LjUtNy44YzMuNCwwLDYuOSwwLjMsMTAuNiwwLjgNCgkJYzMuNywwLjUsNy41LDEuMywxMS41LDIuMnYtNy4zYzAtNy42LTEuNi0xMi45LTQuNy0xNmMtMy4yLTMuMS04LjYtNC42LTE2LjMtNC42Yy0zLjUsMC03LjEsMC40LTEwLjgsMS4zYy0zLjcsMC45LTcuMywyLTEwLjgsMy40DQoJCWMtMS42LDAuNy0yLjgsMS4xLTMuNSwxLjNjLTAuNywwLjItMS4yLDAuMy0xLjYsMC4zYy0xLjQsMC0yLjEtMS0yLjEtMy4xdi00LjljMC0xLjYsMC4yLTIuOCwwLjctMy41YzAuNS0wLjcsMS40LTEuNCwyLjgtMi4xDQoJCWMzLjUtMS44LDcuNy0zLjMsMTIuNi00LjVjNC45LTEuMywxMC4xLTEuOSwxNS42LTEuOWMxMS45LDAsMjAuNiwyLjcsMjYuMiw4LjFjNS41LDUuNCw4LjMsMTMuNiw4LjMsMjQuNlY2Ni40eiBNNDUuOCw4MS42DQoJCWMzLjMsMCw2LjctMC42LDEwLjMtMS44YzMuNi0xLjIsNi44LTMuNCw5LjUtNi40YzEuNi0xLjksMi44LTQsMy40LTYuNGMwLjYtMi40LDEtNS4zLDEtOC43di00LjJjLTIuOS0wLjctNi0xLjMtOS4yLTEuNw0KCQljLTMuMi0wLjQtNi4zLTAuNi05LjQtMC42Yy02LjcsMC0xMS42LDEuMy0xNC45LDRjLTMuMywyLjctNC45LDYuNS00LjksMTEuNWMwLDQuNywxLjIsOC4yLDMuNywxMC42DQoJCUMzNy43LDgwLjQsNDEuMiw4MS42LDQ1LjgsODEuNnogTTEyNi4xLDkyLjRjLTEuOCwwLTMtMC4zLTMuOC0xYy0wLjgtMC42LTEuNS0yLTIuMS0zLjlMOTYuNywxMC4yYy0wLjYtMi0wLjktMy4zLTAuOS00DQoJCWMwLTEuNiwwLjgtMi41LDIuNC0yLjVoOS44YzEuOSwwLDMuMiwwLjMsMy45LDFjMC44LDAuNiwxLjQsMiwyLDMuOWwxNi44LDY2LjJsMTUuNi02Ni4yYzAuNS0yLDEuMS0zLjMsMS45LTMuOWMwLjgtMC42LDIuMi0xLDQtMQ0KCQloOGMxLjksMCwzLjIsMC4zLDQsMWMwLjgsMC42LDEuNSwyLDEuOSwzLjlsMTUuOCw2N2wxNy4zLTY3YzAuNi0yLDEuMy0zLjMsMi0zLjljMC44LTAuNiwyLjEtMSwzLjktMWg5LjNjMS42LDAsMi41LDAuOCwyLjUsMi41DQoJCWMwLDAuNS0wLjEsMS0wLjIsMS42Yy0wLjEsMC42LTAuMywxLjQtMC43LDIuNWwtMjQuMSw3Ny4zYy0wLjYsMi0xLjMsMy4zLTIuMSwzLjljLTAuOCwwLjYtMi4xLDEtMy44LDFoLTguNmMtMS45LDAtMy4yLTAuMy00LTENCgkJYy0wLjgtMC43LTEuNS0yLTEuOS00TDE1NiwyM2wtMTUuNCw2NC40Yy0wLjUsMi0xLjEsMy4zLTEuOSw0Yy0wLjgsMC43LTIuMiwxLTQsMUgxMjYuMXogTTI1NC42LDk1LjFjLTUuMiwwLTEwLjQtMC42LTE1LjQtMS44DQoJCWMtNS0xLjItOC45LTIuNS0xMS41LTRjLTEuNi0wLjktMi43LTEuOS0zLjEtMi44Yy0wLjQtMC45LTAuNi0xLjktMC42LTIuOHYtNS4xYzAtMi4xLDAuOC0zLjEsMi4zLTMuMWMwLjYsMCwxLjIsMC4xLDEuOCwwLjMNCgkJYzAuNiwwLjIsMS41LDAuNiwyLjUsMWMzLjQsMS41LDcuMSwyLjcsMTEsMy41YzQsMC44LDcuOSwxLjIsMTEuOSwxLjJjNi4zLDAsMTEuMi0xLjEsMTQuNi0zLjNjMy40LTIuMiw1LjItNS40LDUuMi05LjUNCgkJYzAtMi44LTAuOS01LjEtMi43LTdjLTEuOC0xLjktNS4yLTMuNi0xMC4xLTUuMkwyNDYsNTJjLTcuMy0yLjMtMTIuNy01LjctMTYtMTAuMmMtMy4zLTQuNC01LTkuMy01LTE0LjVjMC00LjIsMC45LTcuOSwyLjctMTEuMQ0KCQljMS44LTMuMiw0LjItNiw3LjItOC4yYzMtMi4zLDYuNC00LDEwLjQtNS4yYzQtMS4yLDguMi0xLjcsMTIuNi0xLjdjMi4yLDAsNC41LDAuMSw2LjcsMC40YzIuMywwLjMsNC40LDAuNyw2LjUsMS4xDQoJCWMyLDAuNSwzLjksMSw1LjcsMS42YzEuOCwwLjYsMy4yLDEuMiw0LjIsMS44YzEuNCwwLjgsMi40LDEuNiwzLDIuNWMwLjYsMC44LDAuOSwxLjksMC45LDMuM3Y0LjdjMCwyLjEtMC44LDMuMi0yLjMsMy4yDQoJCWMtMC44LDAtMi4xLTAuNC0zLjgtMS4yYy01LjctMi42LTEyLjEtMy45LTE5LjItMy45Yy01LjcsMC0xMC4yLDAuOS0xMy4zLDIuOGMtMy4xLDEuOS00LjcsNC44LTQuNyw4LjljMCwyLjgsMSw1LjIsMyw3LjENCgkJYzIsMS45LDUuNywzLjgsMTEsNS41bDE0LjIsNC41YzcuMiwyLjMsMTIuNCw1LjUsMTUuNSw5LjZjMy4xLDQuMSw0LjYsOC44LDQuNiwxNGMwLDQuMy0wLjksOC4yLTIuNiwxMS42DQoJCWMtMS44LDMuNC00LjIsNi40LTcuMyw4LjhjLTMuMSwyLjUtNi44LDQuMy0xMS4xLDUuNkMyNjQuNCw5NC40LDI1OS43LDk1LjEsMjU0LjYsOTUuMXoiLz4NCgk8Zz4NCgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI3My41LDE0My43Yy0zMi45LDI0LjMtODAuNywzNy4yLTEyMS44LDM3LjJjLTU3LjYsMC0xMDkuNS0yMS4zLTE0OC43LTU2LjdjLTMuMS0yLjgtMC4zLTYuNiwzLjQtNC40DQoJCQljNDIuNCwyNC42LDk0LjcsMzkuNSwxNDguOCwzOS41YzM2LjUsMCw3Ni42LTcuNiwxMTMuNS0yMy4yQzI3NC4yLDEzMy42LDI3OC45LDEzOS43LDI3My41LDE0My43eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjg3LjIsMTI4LjFjLTQuMi01LjQtMjcuOC0yLjYtMzguNS0xLjNjLTMuMiwwLjQtMy43LTIuNC0wLjgtNC41YzE4LjgtMTMuMiw0OS43LTkuNCw1My4zLTUNCgkJCWMzLjYsNC41LTEsMzUuNC0xOC42LDUwLjJjLTIuNywyLjMtNS4zLDEuMS00LjEtMS45QzI4Mi41LDE1NS43LDI5MS40LDEzMy40LDI4Ny4yLDEyOC4xeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';

  public getRequestDto = (
    /* eslint-disable @typescript-eslint/no-unused-vars */
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string,
    url?: string,
    data?: BodyInit,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): RequestDto | Promise<RequestDto> => {
    throw new Error(`Method [${this.getRequestDto.name}] is not supported! Use getConnection method instead!`);
  };
}
