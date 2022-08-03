import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { IInput, IOutput } from '../../Mergado/Connector/MergadoCreateElementConnector';

export const NAME = 'typeform-create-form-connector';

export default class TypeformCreateFormConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'forms';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface RootObject {
    cui_settings?: {
        avatar?: string;
    };
    fields?: {
        attachment?: {
            href?: string;
            properties?: {
                description?: string;
            };
            scale?: number;
            type?: string;
        };
        properties?: {
            description?: string;
            separator?: string;
            structure?: string;
            alphabetical_order?: boolean;
            choices?: {
                label?: string;
                ref?: string;
                attachment?: {
                    href?: string;
                    properties?: {
                        description?: string;
                    };
                    type?: string;
                };
            }[];
            randomize?: boolean;
            allow_multiple_selection?: boolean;
            allow_other_choice?: boolean;
            vertical_alignment?: boolean;
            labels?: {
                center?: string;
                left?: string;
                right?: string;
            };
            start_at_one?: boolean;
            steps?: number;
            show_labels?: boolean;
            supersized?: boolean;
            shape?: string;
            button_text?: string;
            hide_marks?: boolean;
            currency?: string;
            price?: {
                type?: string;
                value?: string;
            };
            show_button?: boolean;
            fields?: {
                properties?: {
                    description?: string;
                    allow_multiple_selection?: boolean;
                    allow_other_choice?: boolean;
                    choices?: {
                        label?: string;
                    }[];
                    vertical_alignment?: boolean;
                };
                ref?: string;
                title?: string;
                type?: string;
            }[];
        };
        ref?: string;
        title: string;
        type: 'matrix' | 'ranking' | 'date' | 'dropdown' | 'email' | 'file_upload' | 'file_upload' | 'group' |
            'legal' | 'long_text' | 'multiple_choice' | 'number' | 'opinion_scale' | 'payment' | 'picture_choice' |
            'rating' | 'short_text' | 'statement' | 'website' | 'yes_no' | 'phone_number';
        validations?: {
            required?: boolean;
            max_length?: number;
            max_value?: number;
            min_value?: number;
        };
        layout?: {
            attachment?: {
                href?: string;
                type?: string;
            };
            placement?: string;
            type?: string;
        };
    }[];
    hidden?: string[];
    logic?: {
        actions: {
            action: string;
            condition: {
                op: string;
                vars: {
                    type: string;
                }[];
            };
            details: {
                to?: {
                    type: string;
                    value: string;
                };
                target?: {
                    type?: string;
                    value?: string;
                };
                value?: {
                    type?: string;
                    value?: number;
                };
            };
        }[];
        ref?: string;
        type: string;
    }[];
    settings?: {
        facebook_pixel?: string;
        google_analytics?: string;
        google_tag_manager?: string;
        hide_navigation?: boolean;
        is_public?: boolean;
        language?: string;
        meta?: {
            allow_indexing?: boolean;
            canva_design_id?: string;
            description?: string;
            image?: {
                href?: string;
            };
            title?: string;
        };
        notifications?: {
            respondent?: {
                enabled?: boolean;
                message?: string;
                recipient?: string;
                reply_to?: string[];
                subject?: string;
            };
            self?: {
                enabled?: boolean;
                message?: string;
                recipients?: string[];
                reply_to?: string;
                subject?: string;
            };
        };
        progress_bar?: string;
        redirect_after_submit_url?: string;
        show_cookie_consent?: boolean;
        show_number_of_submissions?: boolean;
        show_progress_bar?: boolean;
        show_time_to_complete?: boolean;
        show_typeform_branding?: boolean;
    };
    thankyou_screens?: {
        attachment?: {
            href?: string;
            type?: 'form' | 'quiz' | 'classification' | 'score' | 'branching' |
                'classification_branching' | 'score_branching';

        };
        properties?: {
            button_mode?: string;
            button_text?: string;
            redirect_url?: string;
            share_icons?: boolean;
            show_button?: boolean;
        };
        ref?: string;
        title: string;
    }[];
    theme?: {
        href?: string;
    };
    title?: string;
    type?: string;
    variables?: {
        age?: number;
        name?: string;
        price?: number;
        score?: number;
    };
    welcome_screens?: {
        layout?: {
            attachment?: {
                href?: string;
                type?: 'image' | 'video';
            };
            placement?: 'left' | 'right';
            type?: 'split' | 'wallpaper' | 'float';
        };
        properties?: {
            button_text?: string;
            description?: string;
            show_button?: boolean;
        };
        ref?: string;
        title: string;
    }[];
    workspace: {
        href?: string;
    };
}