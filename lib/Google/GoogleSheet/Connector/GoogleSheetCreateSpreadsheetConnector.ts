import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import GoogleSheetApplication from '../GoogleSheetApplication';

const GOOGLE_SHEET_CREATE_SPREADSHEET = '/v4/spreadsheets';

interface IGoogleSheetSpreadsheet {
  name: string,
  dataGrid: string,
}

interface ISheet {
  rowData: Array<IRowData>;
}

interface IRowData {
  values: Array<IValues>;
}

interface IValues {
  userEnteredValue: IUserEnteredValue;
}

interface IUserEnteredValue {
  stringValue: string;
}

export default class GoogleDriveUploadFileConnector extends AConnector {
  public getName = (): string => 'google-sheet-create-spreadsheet';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['name', 'dataGrid'],
    );

    const {
      name,
      dataGrid,
    } = dto.jsonData as IGoogleSheetSpreadsheet;

    const application = this._application as GoogleSheetApplication;
    const applicationInstall = await this._getApplicationInstallFromProcess(dto);

    const data = {
      properties: {
        title: name,
      },
      sheets: {
        properties: {
          title: `Sheet ${name} #1`,
        },
        data: [
          this._parseData(dataGrid),
        ],
      },
    };

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      GOOGLE_SHEET_CREATE_SPREADSHEET,
      JSON.stringify(data),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }

  private _parseData(dataGrid: string): ISheet {
    const rows = dataGrid.split('\n');
    return { rowData: rows.map((row) => this._getValues(row.split(','))) };
  }

  private _getValues = (dataInRow: string[]): IRowData => (
    { values: dataInRow.map((value) => ({ userEnteredValue: { stringValue: value } })) }
  );
}
