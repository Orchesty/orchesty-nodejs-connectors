import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import { BASE_URL } from '../IDokladApplication';

export default class IDokladNewInvoiceReceivedConnector extends AConnector {

    public getName(): string {
        return 'i-doklad-new-invoice-recieved';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const jsonData = dto.getJsonData() as Record<string, unknown>;
        checkParams(
            jsonData,
            [
                'DateOfMaturity',
                'DateOfReceiving',
                'Description',
                'DocumentSerialNumber',
                'IsIncomeTax',
                'PartnerId',
                'PaymentOptionId',
            ],
        );
        checkParams(
            jsonData,
            {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Items: [
                    [
                        'Name',
                        'PriceType',
                        'UnitPrice',
                        'VatRateType',
                    ],
                ],
            },
        );

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/ReceivedInvoices`,
            dto.getData(),
        );

        const response = await this.getSender().send(request, [200, 201], 10);
        dto.setData(response.getBody());

        return dto;
    }

}
