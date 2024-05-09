import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { validate } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import Joi from 'joi';

const inputSchema = Joi.array().items(
    Joi.object({
        isActive: Joi.boolean().optional().allow(null),
        companyIC: Joi.string().optional().allow(null),
        degreeBefore: Joi.string().optional().allow(null),
        firstName: Joi.string().optional().allow(null),
        lastName: Joi.string().optional().allow(null),
        degreeAfter: Joi.string().optional().allow(null),
        dateBirth: Joi.string().optional().allow(null),
        sex: Joi.string().optional().allow(null),
        personalNumber: Joi.string().optional().allow(null),
        employmentRelationshipCode: Joi.string().optional().allow(null),
        isDriver: Joi.boolean().optional().allow(null),
        email: Joi.string().optional().allow(null),
        mobile: Joi.string().optional().allow(null),
        street: Joi.string().optional().allow(null),
        city: Joi.string().optional().allow(null),
        postCode: Joi.string().optional().allow(null),
        country: Joi.string().optional().allow(null),
        costCenter: Joi.string().optional().allow(null),
        costCenterName: Joi.string().optional().allow(null),
        object: Joi.string().optional().allow(null),
        employeeWork: Joi.string().optional().allow(null),
        shift: Joi.string().optional().allow(null),
        work: Joi.string().optional().allow(null),
        workName: Joi.string().optional().allow(null),
        parentEmployee: Joi.string().optional().allow(null),
        dateMaternityLeaveStart: Joi.string().optional().allow(null),
        dateMaternityLeaveEnd: Joi.string().optional().allow(null),
        dateStart: Joi.string().optional().allow(null),
        dateEnd: Joi.string().optional().allow(null),
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
    isActive?: boolean;
    companyIC?: string;
    degreeBefore?: string;
    firstName?: string;
    lastName?: string;
    degreeAfter?: string;
    dateBirth?: string;
    sex?: string;
    personalNumber?: string;
    employmentRelationshipCode?: string;
    isDriver?: boolean;
    email?: string;
    mobile?: string;
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
    costCenter?: string;
    costCenterName?: string;
    object?: string;
    employeeWork?: string;
    shift?: string;
    work?: string;
    workName?: string;
    parentEmployee?: string;
    dateMaternityLeaveStart?: string;
    dateMaternityLeaveEnd?: string;
    dateStart?: string;
    dateEnd?: string;
}

export interface IFabisImportBatchOutput {

}
