import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import AirtableApplication, { BASE_ID, BASE_URL, TABLE_NAME } from '../AirtableApplication';

export const NAME = 'airtable-new-record';

export default class AirtableNewRecordConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<AirtableApplication>();
        if (!app.getValue(applicationInstall, BASE_ID)
            || !app.getValue(applicationInstall, TABLE_NAME)) {
            dto.setStopProcess(
                ResultCode.STOP_AND_FAILED,
                `AppInstall base id [${BASE_ID}] or table name [${TABLE_NAME}] not set.`,
            );

            return dto;
        }

        const url = `
      ${BASE_URL}
      ${app.getValue(applicationInstall, BASE_ID)}
      ${app.getValue(applicationInstall, TABLE_NAME)}
    `;
        const requestDto = await app.getRequestDto(dto, applicationInstall, HttpMethods.POST, url);
        dto.setJsonData(await this.getSender().send(requestDto, [200, 404]));

        return dto;
    }

}
