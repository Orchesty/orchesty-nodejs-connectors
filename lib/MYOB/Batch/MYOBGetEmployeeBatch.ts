import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'myob-get-employee-batch';
const limit = 100;

export default class MYOBGetEmployeeBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const skip = dto.getBatchCursor('0');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/Contact/Employee?$top=${limit}&$skip=${skip}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput[];

    dto.setItemList(response ?? []);
    if (response.length >= limit) {
      dto.setBatchCursor((Number(skip) + limit).toString());
    }
    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */

interface IOutput{
  UID: string,
  LastName: string,
  FirstName: string,
  IsIndividual: boolean,
  DisplayID: string,
  IsActive: boolean,
  Addresses:
    {
      Location: number,
      Street: string,
      City: string,
      State: string,
      PostCode: string,
      Country: string,
      Phone1: string,
      Phone2: string,
      Phone3: string,
      Fax: string,
      Email: string,
      Website: string,
      ContactName: string,
      Salutation: string
    }[]
  Notes: string,
  Identifiers:
    {
      Label: string,
      Value: string
    }[]
  CustomList1: null,
  CustomList2: null,
  CustomList3: null,
  CustomField1: {
    Label: string,
    Value: string
  },
  CustomField2: {
    Label: string,
    Value: string
  },
  CustomField3: {
    Label: string,
    Value: string
  },
  CurrentBalance: number,
  EmployeePayrollDetails: {
    UID: string,
    URI: string
  },
  EmployeePaymentDetails: {
    UID: string,
    URI: string
  },
  EmployeeStandardPay: {
    UID: string,
    URI: string
  },
  TimeBillingDetails: {
    EmployeeBillingRateExcludingTax:
      number,
    CostPerHour:
      number,
  },
  LastModified: string,
  PhotoURI: string,
  URI: string,
  RowVersion: string
}
/* eslint-enable @typescript-eslint/naming-convention */
