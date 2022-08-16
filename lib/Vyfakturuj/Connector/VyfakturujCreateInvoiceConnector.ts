import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'vyfakturuj-create-invoice-connector';

export default class VyfakturujCreateInvoiceConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      '/invoice/',
      dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput{
  id: number,
  id_identity: string,
  id_customer: string,
  id_number_series: string,
  id_payment_method: string,
  id_center: string,
  id_tag: string,
  id_predkontace: string,
  id_cleneniDPH: string,
  id_coupon: string,
  id_parent: string,
  id_eet_pokl: string,
  type: string,
  flags: string,
  tags: string,
  eet_status: string,
  eet_data: string,
  number: string,
  date_created: string,
  date_due: string,
  date_taxable_supply: string,
  date_paid: string,
  date_reminder: string,
  date_reminder_2: string,
  date_reminder_3: string,
  days_due: string,
  supplier_IC: string,
  supplier_DIC: string,
  supplier_IDNUM3: string,
  supplier_name: string,
  supplier_street: string,
  supplier_city: string,
  supplier_zip: string,
  supplier_country: string,
  supplier_country_code: string,
  supplier_contact_name: string,
  supplier_contact_tel: string,
  supplier_contact_mail: string,
  supplier_contact_web: string,
  customer_IC: string,
  customer_DIC: string,
  customer_IDNUM3: string,
  customer_name: string,
  customer_firstname: string,
  customer_lastname: string,
  customer_street: string,
  customer_city: string,
  customer_zip: string,
  customer_country: string,
  customer_country_code: string,
  customer_tel: string,
  customer_delivery_company: string,
  customer_delivery_firstname: string,
  customer_delivery_lastname: string,
  customer_delivery_street: string,
  customer_delivery_city: string,
  customer_delivery_zip: string,
  customer_delivery_country: string,
  customer_delivery_country_code: string,
  customer_delivery_tel: string,
  bank_account_number: string,
  bank_IBAN: string,
  bank_BIC: string,
  payment_method: string,
  calculate_vat: string,
  round_invoice: string,
  order_number: string,
  text_under_subscriber: string,
  text_under_customer: string,
  text_before_items: string,
  text_invoice_footer: string,
  note_internal: string,
  mail_to: [],
  language: string,
  VS: string,
  KS: string,
  SS: string,
  currency: string,
  currency_domestic: string,
  search: string,
  exchange_rate: number,
  total: string,
  total_without_vat: string,
  domestic_total_without_vat: string,
  webhook_paid: string,
  X_1: string,
  X_2: string,
  X_3: string,
  items: [
    {
      quantity: number,
      unit: string,
      text: string,
      unit_price: string,
      vat_rate: number,
      vat_rate_type: number,
      vat: number,
      total: number,
      total_without_vat: number,
      domestic_unit_price: number,
      domestic_vat: number,
      domestic_total: number,
      domestic_total_without_vat: number,
      data: []
    },
  ],
  vats: [
    {
      vat_rate: number,
      base: number,
      vat: number,
      total: number
    },
  ],
  disable_automated_mails: boolean
  storno: boolean,
  moss: boolean,
  oss: boolean,
  need_attention: boolean,
  url_public_webpage: string,
  url_online_payment: string,
  url_download_pdf: string,
  url_download_pdf_no_stamp: string,
  url_app_detail: string,
  log: [
    {
      date: string,
      text: string
    }
  ],
  related_documents: []
}

export interface IInput{
  type: number,
    id_payment_method: number,
    customer_IC: string,
    customer_DIC: string,
    customer_name: string,
    customer_street: string,
    customer_city: string,
    customer_zip: string,
    customer_country_code: string,
    items: [
    {
      text: string,
      unit_price: number,
      vat_rate: number
    },
    {
      text: string,
      unit_price: number,
      vat_rate: number
    },
    {
      text: string,
      unit_price: number,
      vat_rate: number
    }
  ]
}
/* eslint-enable @typescript-eslint/naming-convention */
