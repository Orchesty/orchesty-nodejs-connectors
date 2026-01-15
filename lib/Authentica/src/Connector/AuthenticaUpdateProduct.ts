import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaProduct } from '../types/product';

export const AUTHENTICA_UPDATE_PRODUCT = 'authentica-update-product';

export default class AuthenticaUpdateProduct extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_UPDATE_PRODUCT;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaUpdateProductInput>,
    ): Promise<ProcessDto<AuthenticaUpdateProductOutput>> {
        // eslint-disable-next-line
        let product: any = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            product = (product as any)[this.dataKey];
        }

        const url = `product/${product.id}`;
        delete product.id;

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            url,
            product,
        );

        const resp = (await this.getSender().send<AuthenticaProduct>(req)).getJsonBody();
        if (this.dataKey) {
            // eslint-disable-next-line
            const data = dto.getJsonData() as any;
            data[this.dataKey] = resp;
            dto.setNewJsonData(data);
        } else {
            dto.setNewJsonData(resp);
        }

        return dto as unknown as ProcessDto<AuthenticaUpdateProductOutput>;
    }

}

export type AuthenticaUpdateProductInput = Omit<AuthenticaProduct, 'hasImei' | 'hasLot' | 'hasLotExpiration'>;

export type AuthenticaUpdateProductOutput = AuthenticaProduct;
