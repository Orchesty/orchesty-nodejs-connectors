import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'box-get-collaboration-connector';

export default class BoxGetCollaborationConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { collaboration_id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `collaborations/${collaboration_id}`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    collaboration_id: string;
}

export interface IOutput {
    id: number;
    type: string;
    acceptance_requirements_status: {
        strong_password_requirement: {
            enterprise_has_strong_password_required_for_external_users: boolean;
            user_has_strong_password: boolean;
        };
        terms_of_service_requirement: {
            is_accepted: boolean;
            terms_of_service: {
                id: number;
                type: string;
            };
        };
        two_factor_authentication_requirement: {
            enterprise_has_two_factor_auth_enabled: boolean;
            user_has_two_factor_authentication_enabled: boolean;
        };
    };
    accessible_by: {
        id: number;
        type: string;
        login: string;
        name: string;
    };
    acknowledged_at: Date;
    created_at: Date;
    created_by: {
        id: number;
        type: string;
        login: string;
        name: string;
    }[];
    expires_at: Date;
    invite_email: string;
    is_access_only: boolean;
    item: {
        id: number;
        type: string;
        content_created_at: Date;
        content_modified_at: Date;
        created_at: Date;
        created_by: {
            id: number;
            type: string;
            login: string;
            name: string;
        };
        description: string;
        etag: number;
        file_version: {
            id: number;
            type: string;
            sha1: string;
        };
        item_status: string;
        modified_at: Date;
        modified_by: {
            id: number;
            type: string;
            login: string;
            name: string;
        };
        name: string;
        owned_by: {
            id: number;
            type: string;
            login: string;
            name: string;
        };
        parent: {
            id: number;
            type: string;
            etag: number;
            name: string;
            sequence_id: number;
        };
        path_collection: {
            entries: {
                id: number;
                etag: number;
                type: string;
                sequence_id: number;
                name: string;
            }[];
            total_count: number;
        };
        purged_at: Date;
        sequence_id: number;
        sha1: string;
        shared_link: {
            access: string;
            download_count: number;
            download_url: string;
            effective_access: string;
            effective_permission: string;
            is_password_enabled: boolean;
            permissions: {
                can_download: boolean;
                can_edit: boolean;
                can_preview: boolean;
            };
            preview_count: number;
            unshared_at: Date;
            url: string;
            vanity_name: string;
            vanity_url: string;
        };
        size: number;
        trashed_at: Date;
    };
    modified_at: Date;
    role: string;
    status: string;
}
