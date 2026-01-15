import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import StripeApplication from '../StripeApplication';

const STRIPE_CREATE_PAYMENT_ENDPOINT = '/v1/charges';

interface IStripePayment {
    amount: string;
    currency: string;
    source: string;
    description: string;
}

export default class StripeCreatePaymentConnector extends AConnector {

    public getName(): string {
        return 'stripe-create-payment';
    }

    public async processAction(dto: ProcessDto<IStripePayment>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['amount', 'currency', 'source', 'description'],
        );

        const {
            amount,
            currency,
            source,
            description,
        } = dto.getJsonData();
        const query = new URLSearchParams({
            amount, currency, source, description,
        });

        const application = this.getApplication<StripeApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            STRIPE_CREATE_PAYMENT_ENDPOINT,
            query.toString(),
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}
