import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'allegro-propose-product-connector';

export default class AllegroProposeProductConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'sale/product-proposals';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    name: string;
    category: {
        id: string;
    };
    images: {
        url: string;
    }[];
    parameters: {
        id: string;
        rangeValue: {
            from: string;
            to: string;
        };
        values: string[];
        valuesIds: string[];
        valuesLabels: string[];
        unit: string;
        options: {
            identifiesProduct: boolean;
        };
    }[];
}

export interface IOutput {
    id: string;
    name: string;
    category: {
        id: string;
        similar: {
            id: string;
        }[];
    };
    images: {
        url: string;
    }[];
    parameters: {
        id: string;
        name: string;
        rangeValue: {
            from: string;
            to: string;
        };
        values: string[];
        valuesIds: string[];
        valuesLabels: string[];
        unit: string;
        options: {
            identifiesProduct: boolean;
        };
    }[];
    offerRequirements: {
        id: string;
        parameters: {
            id: string;
            rangeValue: {
                from: string;
                to: string;
            };
            values: string[];
            valuesIds: string[];
            valuesLabels: string[];
            unit: string;
            options: {
                identifiesProduct: boolean;
            };
        }[];
    };
    compatibilityList: {
        id: string;
        type: string;
        items: {
            text: string;
        }[];
    };
    tecdocSpecification: {
        id: string;
        items: {
            name: string;
            values: string[];
        }[];
    };
    description: {
        sections: {
            items: {
                type: string;
            }[];
        }[];
    };
}
