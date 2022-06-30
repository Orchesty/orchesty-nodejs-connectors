import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import StripeApplication from '../StripeApplication';

const STRIPE_CREATE_PAYMENT_ENDPOINT = '/v1/charges';

interface IStripePayment {
  amount: string,
  currency: string,
  source: string,
  description: string,
}

export default class StripeCreatePaymentConnector extends AConnector {
  public getName = (): string => 'stripe-create-payment';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['amount', 'currency', 'source', 'description'],
    );

    const {
      amount,
      currency,
      source,
      description,
    } = dto.jsonData as IStripePayment;
    const query = new URLSearchParams({
      amount, currency, source, description,
    });

    const application = this._application as StripeApplication;
    const applicationInstall = await this._getApplicationInstall(dto.user);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      STRIPE_CREATE_PAYMENT_ENDPOINT,
      query.toString(),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
