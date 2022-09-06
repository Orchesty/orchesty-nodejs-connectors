import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'shopify-absolute-update-stock';

export default class ShopifyAbsoluteUpdateStock extends AConnector {

    public getName = (): string => NAME;

    public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
        const dto = _dto;

        return dto;
    }

}
