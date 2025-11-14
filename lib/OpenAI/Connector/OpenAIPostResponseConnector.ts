import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { NAME as APPLICATION_NAME } from '../OpenAIApplication';

export const NAME = `${APPLICATION_NAME}-post-response-connector`;

// eslint-disable-next-line @typescript-eslint/require-await
export async function getErrorInResponse(response: AxiosResponse, body: string): Promise<string> {
    const data: IOutput = JSON.parse(body);

    if ('error' in data && data.error) {
        throw new Error(`Request failed with code ${data.error.code}. Message: ${data.error.message}`);
    }

    return body;
}

export default class OpenAIPostResponseConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IInput>> {
        const data = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/v1/responses',
            data,
        );

        const responseDto = await this.getSender().send<IInput>(requestDto, {
            success: StatusCodes.OK,
            stopAndFail: [StatusCodes.BAD_REQUEST],
        }, undefined, undefined, getErrorInResponse);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export function getOutputText(response: IOutput): string {
    return response.output
        ?.find((item) => item.type === 'message')?.content
        ?.filter((item) => item.type === 'output_text')
        .map((item) => item.text).join('') ?? '';
}

/* eslint-disable @typescript-eslint/naming-convention */
type Assistant = 'assistant';
type Message = 'message';
type StatusBase = 'in_progress' | 'incomplete';
type Status = StatusBase | 'completed';
type Failed = 'failed';
type FailStatus = Status | Failed;
type Auto = 'auto';
type Mode = Auto | 'required';
type FileSearch = 'file_search';
type WebSearchPreview = 'web_search_preview';
type ComputerUsePreview = 'computer_use_preview';
type CodeInterpreter = 'code_interpreter';
type ImageGeneration = 'image_generation';
type MCP = 'mcp';
type HighLow = 'high' | 'low';
type LowMedHigh = HighLow | 'medium';
type Custom = 'custom';
type ReasoningSummary = Auto | 'concise' | 'detailed';
type ServiceTier = Auto | 'default' | 'flex' | 'priority';
type Truncation = Auto | 'disabled';

export interface IInput {
    background?: boolean;
    conversation?: string | Conversation;
    include?: (
        | 'web_search_call.action.sources'
        | 'code_interpreter_call.outputs'
        | 'computer_call_output.output.image_url'
        | 'file_search_call.results'
        | 'message.input_image.image_url'
        | 'message.output_text.logprobs'
        | 'reasoning.encrypted_content'
    )[];
    input?: string | InputItem[];
    instructions?: string;
    max_output_tokens?: number;
    max_tool_calls?: number;
    metadata?: Metadata;
    model?: string;
    parallel_tool_calls?: boolean;
    previous_response_id?: string;
    prompt?: Prompt;
    prompt_cache_key?: string;
    reasoning?: Reasoning;
    safety_identifier?: string;
    service_tier?: ServiceTier;
    store?: boolean;
    stream?: boolean;
    stream_options?: {
        include_obfuscation?: boolean;
    };
    temperature?: number;
    text?: TextResponse;
    tool_choice?: ToolChoise;
    tools?: Tool[];
    top_logprobs?: number;
    top_p?: number;
    truncation?: Truncation;
    user?: string;
}

interface Conversation {
    id: string;
}

type Item = {
    content: ({
        annotations: ({
            type: 'file_citation';
            file_id: string;
            filename: string;
            index: number;
        } | {
            type: 'url_citation';
            title: string;
            url: string;
            start_index: number;
            end_index: number;
        } | {
            type: 'container_file_citation';
            container_id: string;
            file_id: string;
            filename: string;
            start_index: number;
            end_index: number;
        } | {
            type: 'file_path';
            file_id: string;
            index: number;
        })[];
        logprobs: (LogProb & {
            top_logprobs: LogProb[];
        })[];
        text: string;
        type: 'output_text';
    } | {
        type: 'refusal';
        refusal: string;
    })[];
    id: string;
    role: Assistant;
    status: Status;
    type: Message;
} | {
    type: 'file_search_call';
    id: string;
    queries: string[];
    status: StatusBase | Failed | 'searching';
    results?: {
        attributes?: Record<string, string | number | boolean>;
        file_id?: string;
        score?: number;
        text?: string;
    }[]
} | {
    type: 'computer_call';
    action: (Coords & {
        type: 'click';
        button: 'left' | 'right' | 'wheel' | 'back' | 'forward';
    }) | (Coords & {
        type: 'double_click';
    })
    | {
        type: 'drag';
        path: Coords[];
    }
    | {
        type: 'keypress';
        keys: string[];
    }
    | (Coords & {
        type: 'move';
    })
    | {
        type: 'screenshot';
    }
    | (Coords & {
        type: 'scroll';
        scroll_x: number;
        scroll_y: number;
    })
    | {
        type: 'type';
        text: string;
    }
    | {
        type: 'wait';
    };
    call_id: string;
    id: string;
    pending_safety_checks: SafetyChecks[];
    status: Status;
} | {
    type: 'computer_call_output';
    call_id: string;
    output: {
        type?: string;
        file_id?: string;
        image_url?: string;
    }[];
    id?: string;
    status?: Status;
    acknowledged_safety_checks?: SafetyChecks[];
} | {
    type: 'web_search_call';
    action: {
        query: string;
        type: string;
        sources?: {
            type: 'url';
            url: string;
        }[];
    } | {
        type: string;
        url: string;
    }
    | {
        pattern: string;
    };
    id: string;
    status: string;
} | {
    type: 'function_call';
    call_id: string;
    arguments: string;
    name: string;
    id?: string;
    status?: Status;
} | {
    type: 'function_call_output';
    call_id: string;
    output: string | InputItemContent[];
    id?: string;
    status?: Status;
} | {
    type: 'reasoning';
    id: string;
    summary: {
        type: 'summary_text';
        text: string;
    }[];
    content?: {
        type: 'reasoning_text';
        text: string;
    }[];
    encrypted_content?: string;
    status?: Status;

} | {
    type: 'image_generation_call';
    id: string;
    result: string;
    status: string;
} | {
    type: 'code_interpreter_call';
    id: string;
    container_id: string;
    code: string;
    status: FailStatus | 'interpreting';
    outputs: ({
        type: 'logs';
        logs: string;
    } | {
        type: 'image';
        url: string;
    })[];
} | {
    type: 'local_shell_call';
    id: string;
    call_id: string;
    action: {
        type: 'exec';
        comand: string[];
        env: Record<string, string>;
        timeout_ms?: number;
        user?: string;
        working_directory?: string;
    };
    status: string;
} | {
    type: 'local_shell_call_output';
    id: string;
    output: string;
    status: Status;
} | {
    type: 'mcp_list_tools';
    id: string;
    server_label: string;
    tools: {
        name: string;
        input_schema: object;
        annotations: object;
        description: string;
    }[];
    error?: string;
} | {
    type: 'mcp_approval_request';
    id: string;
    name: string;
    server_label: string;
    arguments: string;
} | {
    type: 'mcp_approval_response';
    approval_request_id: string;
    approve: boolean;
    id?: string;
    reason?: string;
} | {
    type: 'mcp_call';
    id: string;
    name: string;
    server_label: string;
    arguments: string;
    approval_request_id?: string;
    output?: string;
    error?: string;
    status?: FailStatus | 'calling';
} | {
    type: 'custom_tool_call';
    call_id: string;
    name: string;
    input: string;
    id?: string;
}
    | {
        type: 'custom_tool_call_output';
        call_id: string;
        output: string | InputItemContent[];
        id?: string;
    };

type InputItem = {
    content: string | InputItemContent[];
    role: Assistant | 'user' | 'system' | 'developer';
    type?: Message;
    statuss?: Status;
}
    | Item
    | {
        type?: 'item_reference';
        id: string;
    };

type InputItemContent = {
    type: 'input_text';
    text: string;
} | {
    type: 'input_image';
    detail: Auto | HighLow;
    file_id?: string;
    image_url?: string;
} | {
    type: 'input_file';
    file_data?: string;
    file_id?: string;
    file_url?: string;
    filename?: string;
};

interface LogProb {
    bytes: Uint8Array;
    logprob: number;
    token: string;
}

interface Coords {
    x: number;
    y: number;
}

interface SafetyChecks {
    id: string;
    code?: string;
    message?: string;
}

interface TextFormat {
    type: 'text';
}

interface HostedToolChoise {
    type: FileSearch | WebSearchPreview | ComputerUsePreview | CodeInterpreter | ImageGeneration;
}

interface FunctionToolChoise {
    type: 'function';
    name: string;
}

interface MCPToolChoise {
    type: MCP;
    server_label: string;
    name?: string;
}

interface CustomToolChoise {
    type: Custom;
    name: string;
}

type FileSearchFilters =
    | {
        key: string;
        type: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin';
        value: string | number | boolean | string[] | number[] | boolean[];
    }
    | {
        filters: FileSearchFilters[];
        type: 'and' | 'or';
    };

interface WebSearchToolUserLocation {
    type: 'approximate';
    city?: string;
    country?: string;
    region?: string;
    timezone?: string;
}

interface MCPToolApprovalToolFilter {
    read_only?: boolean;
    tool_names?: string[];
}

type Metadata = Record<string, string>;

interface Prompt {
    id: string;
    variables?: Record<string, string | InputItemContent>;
    version?: string;
}

interface TextResponse {
    format?: TextFormat | {
        type: 'json_schema';
        name: string;
        schema: object;
        description?: string;
        strict?: boolean;
    } | {
        type: 'json_object';
    };
    verbosity?: LowMedHigh;
}

interface Reasoning {
    effort?: LowMedHigh | 'minimal';
    generate_summary?: ReasoningSummary;
    summary?: ReasoningSummary;
}

type ToolChoise = Mode
    | 'none'
    | {
        type: 'allowed_tools';
        mode: Mode;
        tools: (HostedToolChoise | FunctionToolChoise | MCPToolChoise | CustomToolChoise)[];
    }
    | HostedToolChoise
    | FunctionToolChoise
    | MCPToolChoise
    | CustomToolChoise;

type Tool = {
    type: 'function';
    name: string;
    parameters: object;
    strict: boolean;
    description?: string;
} | {
    type: FileSearch;
    vector_store_ids: string[];
    filters?: FileSearchFilters;
    max_num_results?: number;
    ranking_options?: {
        hybrid_search?: {
            embedding_weight: number;
            text_weight: number;
        };
        ranker?: string;
        score_threshold?: number;
    };
} | {
    type: ComputerUsePreview;
    display_height: number;
    display_width: number;
    environment: string;
} | {
    type: 'web_search';
    filters?: {
        allowed_domains?: string[];
    };
    search_context_size?: LowMedHigh;
    user_location?: WebSearchToolUserLocation;
} | {
    type: MCP;
    server_label: string;
    authorization?: string;
    connector_id?: string;
    headers?: Record<string, string>;
    server_description?: string;
    server_url?: string
    require_approval?: 'always' | 'never' | {
        always?: MCPToolApprovalToolFilter;
        never?: MCPToolApprovalToolFilter;
    };
    allowed_tools?: string[] | MCPToolApprovalToolFilter;
} | {
    type: CodeInterpreter;
    container: string | {
        type: Auto;
        file_ids?: string[];
        memory_limit?: string;
    };
} | {
    type: ImageGeneration;
    background?: Auto | 'transparent' | 'opaque';
    input_fidelity?: HighLow;
    input_image_mask?: {
        file_id?: string;
        image_url?: string;
    };
    model?: string;
    moderation?: string;
    output_compression?: number;
    output_format?: 'png' | 'webp' | 'jpeg';
    partial_images?: number;
    quality?: LowMedHigh | Auto;
    size?: Auto | '1024x1024' | '1024x1536' | '1536x1024';
} | {
    type: 'local_shell';
} | {
    type: Custom;
    name: string;
    description?: string;
    format?: TextFormat | {
        type: 'grammar';
        definition: string;
        syntax: 'lark' | 'regex';
    };
} | {
    type: WebSearchPreview;
    search_context_size: LowMedHigh;
    user_location: WebSearchToolUserLocation;
};

interface IOutput {
    background: boolean;
    conversation: Conversation;
    created_at: number;
    error: {
        code: string;
        message: string;
    } | null;
    id: string;
    incomplete_details: {
        reason: string;
    } | null;
    instructions: string | InputItem[] | null;
    max_output_tokens: number | null;
    max_tool_calls: number;
    metadata: Metadata;
    model: string;
    object: 'response';
    output: Item[];
    parallel_tool_calls: boolean;
    previous_response_id: string | null;
    prompt: Prompt;
    prompt_cache_key: string;
    reasoning: Reasoning;
    safety_identifier: string;
    service_tier: ServiceTier;
    status: FailStatus | 'queued' | 'cancelled';
    temperature: number;
    text: TextResponse;
    tool_choice: ToolChoise;
    tools: Tool[];
    top_logprobs: number;
    top_p: number;
    truncation: Truncation;
    usage: Usage;
    user: string | null;
    store: boolean
}

interface Usage {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    input_tokens_details: {
        cached_tokens: number
    };
    output_tokens_details: {
        reasoning_tokens: number
    }
}
