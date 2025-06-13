import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'create-package-manual';

export default class CreatePackageManual extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'createPackageManual';
    }

    protected getParameters(dto: ProcessDto<IInput>): object {
        const { orderId, courierCode, packageNumber, pickupDate, returnShipment } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            order_id: orderId,
            courier_code: courierCode,
            package_number: packageNumber,
            pickup_date: pickupDate,
            return_shipment: returnShipment,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

}

export interface IInput {
    orderId: number;
    courierCode: string;
    packageNumber: string;
    pickupDate: string;
    returnShipment: boolean;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    package_id: number;
    package_number: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
