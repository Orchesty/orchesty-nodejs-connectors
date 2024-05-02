import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { validate } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import Joi from 'joi';

const inputSchema = Joi.array().items(
    Joi.object({
        isActive: Joi.boolean().required(),
        companyIC: Joi.string().required(),
        degreeBefore: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        degreeAfter: Joi.string().required(),
        dateBirth: Joi.string().required(),
        sex: Joi.string().required(),
        personalNumber: Joi.string().required(),
        employmentRelationshipCode: Joi.string().required(),
        isDriver: Joi.boolean().required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        postCode: Joi.string().required(),
        country: Joi.string().required(),
        costCenter: Joi.string().required(),
        costCenterName: Joi.string().required(),
        object: Joi.string().required(),
        employeeWork: Joi.string().required(),
        shift: Joi.string().required(),
        work: Joi.string().required(),
        workName: Joi.string().required(),
        parentEmployee: Joi.string().required(),
        dateMaternityLeaveStart: Joi.string().required(),
        dateMaternityLeaveEnd: Joi.string().required(),
        dateStart: Joi.string().required(),
        dateEnd: Joi.string().required(),
    }),
);

export const FABIS_IMPORT_BATCH_CONNECTOR = 'fabis-import-batch-connector';

export default class FabisImportBatchConnector extends AConnector {

    public getName(): string {
        return FABIS_IMPORT_BATCH_CONNECTOR;
    }

    @validate(inputSchema)
    public async processAction(
        dto: ProcessDto<IFabisImportBatchInput[]>,
    ): Promise<ProcessDto<IFabisImportBatchOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'v1/Import/Batch',
        );
        const resp = await this.getSender().send<IResponse>(req);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

interface IResponse {

}

export interface IFabisImportBatchInput {
    isActive: boolean;
    companyIC: string;
    degreeBefore: string;
    firstName: string;
    lastName: string;
    degreeAfter: string;
    dateBirth: string;
    sex: string;
    personalNumber: string;
    employmentRelationshipCode: string;
    isDriver: boolean;
    email: string;
    mobile: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
    costCenter: string;
    costCenterName: string;
    object: string;
    employeeWork: string;
    shift: string;
    work: string;
    workName: string;
    parentEmployee: string;
    dateMaternityLeaveStart: string;
    dateMaternityLeaveEnd: string;
    dateStart: string;
    dateEnd: string;
}

export interface IFabisImportBatchOutput {

}
