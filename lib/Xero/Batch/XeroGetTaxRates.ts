import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import XeroApplication from '../XeroApplication';

export const NAME = 'xero-get-tax-rates';

export default class XeroGetTaxRates extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const requestDto = this.getApplication<XeroApplication>()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.GET,
                'TaxRates',
            );

        const response = await this.getSender().send<IResponse>(requestDto);

        this.setItemsListToDto(dto, response.getJsonBody().TaxRates);

        return dto;
    }

    protected setItemsListToDto(dto: BatchProcessDto, taxes: TaxRate[]): void {
        dto.setItemList(taxes);
    }

}

export interface IResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TaxRates: TaxRate[];
}

export interface TaxComponent {
    /* eslint-disable @typescript-eslint/naming-convention */
    Name: string;
    Rate: string;
    IsCompound: string;
    IsNonRecoverable: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface TaxRate {
    /* eslint-disable @typescript-eslint/naming-convention */
    Name: string;
    TaxType: string;
    CanApplyToAssets: string;
    CanApplyToEquity: string;
    CanApplyToExpenses: string;
    CanApplyToLiabilities: string;
    CanApplyToRevenue: string;
    DisplayTaxRate: string;
    EffectiveRate: string;
    Status: string;
    TaxComponents: TaxComponent[];
    /* eslint-enable @typescript-eslint/naming-convention */
}
