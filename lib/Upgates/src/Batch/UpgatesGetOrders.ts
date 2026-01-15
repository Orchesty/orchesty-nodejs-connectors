import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { DateTime } from 'luxon';
import UpgatesApplication, { NAME as BASE_NAME } from '../UpgatesApplication';

export const NAME = `${BASE_NAME.toLowerCase()}-get-orders`;

const LIST_PAGE_ENDPOINT = 'api/v2/orders';

export default class UpgatesGetOrders extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const app = this.getApplication<UpgatesApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const { from, orderNumber, orderNumbers } = dto.getJsonData();
        const pageNumber = dto.getBatchCursor('1');

        let url: string;

        if (orderNumbers) {
            url = `${LIST_PAGE_ENDPOINT}?order_numbers=${orderNumbers}`;
        } else if (orderNumber) {
            url = `${LIST_PAGE_ENDPOINT}/${orderNumber}`;
        } else {
            url = `${LIST_PAGE_ENDPOINT}?page=${pageNumber}`;

            const lastRun = from ?? app.getIsoDateFromDate(appInstall.getNonEncryptedSettings().orderLastRun);
            if (lastRun) {
                url = `${url}&creation_time_from=${lastRun}`;
            }
        }

        const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const res = await this.getSender().send<IResponseJson>(requestDto);

        const {

            number_of_pages,
            orders,
        } = res.getJsonBody();

        if (Number(pageNumber) < number_of_pages) {
            dto.setBatchCursor((Number(pageNumber) + 1).toString());
        } else if (!orderNumber) {
            appInstall.setNonEncryptedSettings({ orderLastRun: DateTime.now() });
            const repo = this.getDbClient().getApplicationRepository();
            await repo.update(appInstall);
        }
        dto.setItemList(orders);

        return dto;
    }

}

export interface IInput {
    from?: string;
    orderNumber?: string;
    orderNumbers?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponseJson extends IOrderJson {
    number_of_pages: number;
}

interface IOrderJson {
    orders: IOrder[];
}

export interface IOrder {
    order_number: string;
    external_order_number: string;
    language_id: string;
    prices_with_vat_yn: string;
    status_id: string;
    currency_id: string;
    status: string;
    paid_date: string;
    tracking_code: string;
    resolved_yn: string;
    internal_note: string;
    last_update_time: string;
    creation_time: string;
    variable_symbol: string;
    total_weight: string;
    order_total: string;
    order_total_before_round: string;
    order_total_rest: string;
    invoice_number: string;
    origin: string;
    customer: {
        email: string;
        phone: string;
        firstname_invoice: string;
        surname_invoice: string;
        street_invoice: string;
        city_invoice: string;
        state_invoice: string;
        zip_invoice: string;
        country_id_invoice: string;
        postal_yn: string;
        firstname_postal: string;
        surname_postal: string;
        street_postal: string;
        city_postal: string;
        state_postal: string;
        zip_postal: string;
        country_id_postal: string;
        company_postal: string;
        company_yn: string;
        company: string;
        ico: string;
        dic: string;
        vat_payer_yn: string;
        customer_note: string;
        agreements: {
            name: string;
            valid_to: string;
            status: string;
        }[];
    };
    products: {
        product_id: string;
        option_set_id: string;
        code: string;
        code_supplier: string;
        ean: string;
        title: string;
        unit: string;
        quantity: string;
        price_per_unit: string;
        price: string;
        price_with_vat: string;
        price_without_vat: string;
        vat: string;
        buy_price: string;
        weight: string;
        invoice_info: string;
        parameters: {
            name: string;
            value: string;
        }[];
        configurations: {
            name: string;
            values: {
                value: string;
                operation: string;
                price: string;
            }[];
        }[];
    }[];
    discount_voucher: {
        code: string;
        type: string;
        amount: string;
        discounts: {
            vat: string;
            price: string;
        }[];
    };
    quantity_discount: {
        type: string;
        amount: string;
        discounts: {
            vat: string;
            price: string;
        }[];
    };
    loyalty_points: {
        one_point_for: string;
        amount: string;
        discounts: {
            vat: string;
            price: string;
        }[];
    };
    shipment: {
        id: number;
        code: string;
        name: string;
        price: string;
        vat: string;
        affiliate_id: string;
        affiliate_name: string;
    };
    payment: {
        id: number;
        code: string;
        name: string;
        price: string;
        vat: string;
        eet_yn: string;
    };
    metas: {
        key: string;
        type: string;
        value: string;
        values: {
            cs: {
                language: string;
                value: string;
            };
        };
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
