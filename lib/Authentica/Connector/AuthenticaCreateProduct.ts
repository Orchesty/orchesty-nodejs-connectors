import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaProduct } from '../types/product';

export const AUTHENTICA_CREATE_PRODUCT = 'authentica-create-product';

export default class AuthenticaCreateProduct extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_CREATE_PRODUCT;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaCreateProductInput>,
    ): Promise<ProcessDto<AuthenticaCreateProductOutput>> {
        let product = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            product = (product as any)[this.dataKey];
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'product',
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

        return dto as unknown as ProcessDto<AuthenticaCreateProductOutput>;
    }

}

export type AuthenticaCreateProductInput = Omit<AuthenticaProduct, 'id'>;

export type AuthenticaCreateProductOutput = AuthenticaProduct;
