import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import FakturoidApplication, { ACCOUNT, BASE_ACCOUNTS, BASE_URL } from '../FakturoidApplication';

export default abstract class AFakturoidConnector extends AConnector {

    protected name = '';

    protected endpoint = '';

    protected method: HttpMethods = HttpMethods.GET;

    public getName(): string {
        return this.name;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        let body;
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<FakturoidApplication>();
        if (!app.isAuthorized(applicationInstall)) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, `AppInstall [${applicationInstall.getName()}] is not authorized!`);
            return dto;
        }

        const url = `${BASE_URL}/${BASE_ACCOUNTS}/${applicationInstall
            .getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ACCOUNT]}/${this.endpoint}`;
        const arrayBodyMethods: string[] = [HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH];
        if (arrayBodyMethods.includes(this.method)) {
            body = dto.getData();
        }

        const requestDto = app.getRequestDto(dto, applicationInstall, this.method, url, body);
        const response = await this.getSender().send(requestDto, { success: '200-201' });
        dto.setData(response.getBody());

        return dto;
    }

}
