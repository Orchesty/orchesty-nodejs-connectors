import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'mall-get-product-detail-connector';

export default class MallGetProductDetailConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { productId } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `products/${productId}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        return dto.setNewJsonData(response.data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    result: {
        code: number;
        status: string;
    };
    data: IOutput;
}

export interface IInput {

    productId: string;

}

export interface IOutput {
    id: string;
    title: string;
    shortdesc: string;
    longdesc: string;
    priority: number;
    barcode: number;
    price: number;
    rrp: number;
    media: [
        {
            url: string;
            main: boolean;
            switch: string;
            energy_label: boolean;
            information_list: boolean;
        },
    ];
    promotions: [
        {
            price: number;
            from: string;
            to: string;
        },
    ];
    labels: [
        {
            label: string;
            from: string;
            to: string;
        },
    ];
    parameters: {
        COLOR: string;
        SIZE: string;
    };
    dimensions: {
        weight: number;
        width: number;
        length: number;
        height: number;
    };
    availability: {
        status: string;
        in_stock: number;
    };
    recommended: string[];
    delivery_delay: number;
    free_delivery: boolean;
    package_size: string;
    mallbox_allowed: boolean;
    article_id: number;
    url: string;
    overrides: {
        label: [
            {
                value: string;
                valid_from: string;
                valid_to: string;
            },
        ];
        priority: [
            {
                value: number;
                valid_from: string;
                valid_to: string;
            },
        ];
    };
    category_id: string;
    vat: number;
    variants: [
        {
            article_id: number;
            url: string;
            overrides: {
                label: [
                    {
                        value: string;
                        valid_from: string;
                        valid_to: string;
                    },
                ];
                priority: [
                    {
                        value: number;
                        valid_from: string;
                        valid_to: string;
                    },
                ];
            };
            id: string;
            title: string;
            shortdesc: string;
            longdesc: string;
            priority: number;
            barcode: number;
            price: number;
            rrp: number;
            media: [
                {
                    url: string;
                    main: boolean;
                    switch: string;
                    energy_label: boolean;
                    information_list: boolean;
                },
            ];
            promotions: [
                {
                    price: number;
                    from: string;
                    to: string;
                },
            ];
            labels: [
                {
                    label: string;
                    from: string;
                    to: string;
                },
            ];
            parameters: {
                COLOR: string;
                SIZE: string;
            };
            dimensions: {
                weight: number;
                width: number;
                length: number;
                height: number;
            };
            availability: {
                status: string;
                in_stock: number;
            };
            recommended: string[];
            delivery_delay: number;
            free_delivery: boolean;
            package_size: string;
            mallbox_allowed: boolean;
        },
    ];
    variable_parameters: string[];
    partner_title: string;
    brand_id: string;
    weee_fee: number;
    stage: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
