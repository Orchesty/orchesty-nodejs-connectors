import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import GoogleSheetApplication from '../GoogleSheetApplication';

const GOOGLE_SHEET_CREATE_SPREADSHEET = '/v4/spreadsheets';

interface IGoogleSheetSpreadsheet {
    name: string;
    data: string[][];
}

interface ISheet {
    rowData: IRowData[];
}

interface IRowData {
    values: IValues[];
}

interface IValues {
    userEnteredValue: IUserEnteredValue;
}

interface IUserEnteredValue {
    stringValue: string;
}

export default class GoogleDriveUploadFileConnector extends AConnector {

    public getName(): string {
        return 'google-sheet-create-spreadsheet';
    }

    public async processAction(dto: ProcessDto<IGoogleSheetSpreadsheet>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['name', 'data'],
        );

        const {
            name,
            data: innerData,
        } = dto.getJsonData();

        const application = this.getApplication<GoogleSheetApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const data = {
            properties: {
                title: name,
            },
            sheets: [
                {
                    properties: {
                        title: `Sheet ${name} #1`,
                    },
                    data: this.parseData(innerData),
                },
            ],
        };

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            GOOGLE_SHEET_CREATE_SPREADSHEET,
            data,
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

    private parseData(data: string[][]): ISheet {
        return {
            rowData: data.map((item) => ({
                values: item.map((value) => ({
                    userEnteredValue: { stringValue: value },
                })),
            })),
        };
    }

}
