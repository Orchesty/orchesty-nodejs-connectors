import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'amazon-create-shipment-connector';

export default class AmazonCreateShipmentConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'shipping/v1/shipments',
            body,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    clientReferenceId: string;
    shipTo: {
        name: string;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        stateOrRegion: string;
        city: string;
        countryCode: string;
        postalCode: string;
        email: string;
        copyEmails: [
            string,
        ];
        phoneNumber: string;
    };
    shipFrom: {
        name: string;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        stateOrRegion: string;
        city: string;
        countryCode: string;
        postalCode: string;
        email: string;
        copyEmails: [
            string,
        ];
        phoneNumber: string;
    };
    containers: [
        {
            containerType: string;
            containerReferenceId: string;
            value: {
                value: 0;
                unit: string;
            };
            dimensions: {
                length: number;
                width: number;
                height: number;
                unit: string;
            };
            items: [
                {
                    quantity: number;
                    unitPrice: {
                        value: number;
                        unit: string;
                    };
                    unitWeight: {
                        unit: string;
                        value: number;
                    };
                    title: string;
                },
            ];
            weight: {
                unit: string;
                value: number;
            };
        },
    ];
}

export interface IOutput {
    shipmentId: string;
    eligibleRates: [
        {
            billedWeight: {
                value: number;
                unit: string;
            };
            totalCharge: {
                value: number;
                unit: string;
            };
            serviceType: string;
            promise: {
                deliveryWindow: {
                    start: string;
                    end: string;
                };
                receiveWindow: {
                    start: string;
                    end: string;
                };
            };
            rateId: string;
            expirationTime: string;
        },
    ];
}
