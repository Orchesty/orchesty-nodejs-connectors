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
    ): Promise<ProcessDto> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'v1/Import/Batch',
        );
        const resp = await this.getSender().send(req);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IFabisImportBatchInput {
    isActive?: boolean | null;
    companyIC?: string | null;
    degreeBefore?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    degreeAfter?: string | null;
    dateBirth?: string | null;
    sex?: string | null;
    personalNumber?: string | null;
    employmentRelationshipCode?: string | null;
    isDriver?: boolean | null;
    email?: string | null;
    mobile?: string | null;
    street?: string | null;
    city?: string | null;
    postCode?: string | null;
    country?: string | null;
    costCenter?: string | null;
    costCenterName?: string | null;
    object?: string | null;
    employeeWork?: string | null;
    shift?: string | null;
    work?: string | null;
    workName?: string | null;
    parentEmployee?: string | null;
    dateMaternityLeaveStart?: string | null;
    dateMaternityLeaveEnd?: string | null;
    dateStart?: string | null;
    dateEnd?: string | null;
}
