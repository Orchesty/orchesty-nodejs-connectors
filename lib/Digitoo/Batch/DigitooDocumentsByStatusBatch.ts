import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'digitoo-documents-by-status-batch';

export default class DigitooDocumentsByStatusBatch extends ABatchNode {

    protected status = 'ready-to-export';

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const page = dto.getBatchCursor('0');

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication()
            .getRequestDto(
                dto,
                appInstall,
                HttpMethods.GET,
                `api/documents?page[pageSize]=100&multivalue=true&filter[status]=${this.status}&page[pageNumber]=${page}`,
            );
        const resp = await this.getSender()
            .send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        if (response.hasNextPage) {
            dto.setBatchCursor((Number(page) + 1).toString());
        }

        dto.setItemList(response.data);
        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    data: IOutput[];
    hasNextPage: boolean;
}

export interface IOutput {
    annotations_map: {
        sender_address: string;
        sender_name: string;
        sender_register_id: string;
        sender_vat_id: string;
        sender_tax_id: string;
        recipient_name: string;
        recipient_address: string;
        recipient_register_id: string;
        recipient_tax_id: string;
        recipient_vat_id: string;
        iban: string;
        bic: string;
        due_date: string;
        issue_date: string;
        taxable_supply_date: string;
        accounting_date: string;
        currency: string;
        exchange_rate: number;
        invoice_id: string;
        total_base: number;
        total_tax: number;
        total_incl_tax: number;
        tax_details: {
            rate: number;
            base: number;
            tax: number;
        }[];
        line_items: {
            description: string;
            quantity: number;
            unit_base: number;
            total_base: number;
            tax_rate: number;
            total_tax: number;
            total_incl_tax: number;
            report_code: string;
            vat_code?: string;
            cost_center?: string;
            contract?: string;
        }[];
        report_code: string;
        payment_type: string;
        document_type: string;
    };
    created_at: string;
    id: string;
    export_version_id: string;
    internal_erp_id: string;
    queue_id: string;
    queue_type: string;
    status: string;
    last_status_changed_by: string;
    export_error: string;
    marked_as_exported_at: string;
    marked_as_exporting_at: string;
    marked_as_ready_to_export_at: string;
    document_url: string;
    file_name: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
