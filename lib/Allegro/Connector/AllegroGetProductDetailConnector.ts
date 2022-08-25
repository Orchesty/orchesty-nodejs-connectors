import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'allegro-get-product-detail-connector';

export default class AllegroGetProductDetailConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { productId } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `sale/products/${productId}`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    productId: string;
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
