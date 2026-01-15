/* eslint-disable */

export interface IceWarpChannelMember {
    name: string;
}

export interface IceWarpChannel {
    id: string;
    name: string;
    created: number;
    creator: string;
    is_archived: boolean;
    is_member: boolean;
    group_email: string;
    group_folder_name: string;
    is_active: boolean;
    is_auto_followed: boolean;
    is_notifications: boolean;
    num_members: number;
    num_members_display: number;
    members: IceWarpChannelMember[];
}
