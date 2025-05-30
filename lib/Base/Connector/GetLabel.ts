import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'get-label';

export default class GetLabel extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getLabel';
    }

    protected getParameters(dto: ProcessDto<IInput>): object {
        const { courierCode, packageId, packageNumber } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            courier_code: courierCode,
            package_id: packageId,
            package_number: packageNumber,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

}

export interface IInput {
    courierCode: string;
    packageId: number;
    packageNumber?: string;
}

export interface IOutput {
    extension: string;
    label: string;
}
