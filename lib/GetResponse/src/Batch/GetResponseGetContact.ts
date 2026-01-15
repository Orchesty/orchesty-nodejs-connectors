import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'get-response-get-contact';

export default class GetResponseGetContact extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const page = dto.getBatchCursor('1');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `contacts?page=${page}&perPage=100&filter=basic`,
        );
        const resp = await this.getSender().send<IOutput[]>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response ?? []);
        if (response.length >= 100) {
            dto.setBatchCursor((Number(page) + 1).toString());
        }

        return dto;
    }

}

export interface IOutput {
    contactId: string;
    name: string;
    origin: string;
    timeZone: string;
    activities: string;
    changedOn: string;
    createdOn: string;
    campaign: {
        campaignId: string;
        href: string;
        name: string;
    };
    email: string;
    dayOfCycle: string;
    scoring: number;
    engagementScore: number;
    href: string;
    note: string;
    ipAddress: string;
}
