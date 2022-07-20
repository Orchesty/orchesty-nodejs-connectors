import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'allegro-get-product-detail-connector';

export default class AllegroGetProductDetailConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { productId } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `sale/products/${productId}`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.GET, url);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}
export interface IInput{
    productId: string;
}
export interface IOutput {
    id: string;
    name: string;
    category: {
        id: string;
        similar: [{
            id: string;
        }];
    };
    images: [{
        url: string;
    }];
    parameters: [{
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
    }];
    offerRequirements: {
        id: string;
        parameters: [{
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
        }];
    };
    compatibilityList: {
        id: string;
        type: string;
        items: [{
            text: string;
        }
        ];
    };
    tecdocSpecification: {
        id: string;
        items: [{
            name: string;
            values: string[];
        }];
    };
    description: {
        sections: [{
            items: [{
                type: string;
            }];
        }];
    };
}
