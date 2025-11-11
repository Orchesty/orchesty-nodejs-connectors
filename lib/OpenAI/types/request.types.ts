/* eslint-disable @typescript-eslint/naming-convention */
export type Assistant = 'assistant';
export type Message = 'message';
export type StatusBase = 'in_progress' | 'incomplete';
export type Status = StatusBase | 'completed';
export type Failed = 'failed';
export type FailStatus = Status | Failed;
export type Auto = 'auto';
export type Mode = Auto | 'required';
export type FileSearch = 'file_search';
export type WebSearchPreview = 'web_search_preview';
export type ComputerUsePreview = 'computer_use_preview';
export type CodeInterpreter = 'code_interpreter';
export type ImageGeneration = 'image_generation';
export type MCP = 'mcp';
export type HighLow = 'high' | 'low';
export type LowMedHigh = HighLow | 'medium';
export type Custom = 'custom';
export type ReasoningSummary = Auto | 'concise' | 'detailed';
export type ServiceTier = Auto | 'default' | 'flex' | 'priority';
export type Truncation = Auto | 'disabled';

export interface OpenAIRequest {
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

export interface Conversation {
    id: string;
}

export type Item = {
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

export type InputItem = {
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

export type InputItemContent = {
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

export interface LogProb {
    bytes: Uint8Array;
    logprob: number;
    token: string;
}

export interface Coords {
    x: number;
    y: number;
}

export interface SafetyChecks {
    id: string;
    code?: string;
    message?: string;
}

export interface TextFormat {
    type: 'text';
}

export interface HostedToolChoise {
    type: FileSearch | WebSearchPreview | ComputerUsePreview | CodeInterpreter | ImageGeneration;
}

export interface FunctionToolChoise {
    type: 'function';
    name: string;
}

export interface MCPToolChoise {
    type: MCP;
    server_label: string;
    name?: string;
}

export interface CustomToolChoise {
    type: Custom;
    name: string;
}

export type FileSearchFilters =
    | {
        key: string;
        type: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin';
        value: string | number | boolean | string[] | number[] | boolean[];
    }
    | {
        filters: FileSearchFilters[];
        type: 'and' | 'or';
    };

export interface WebSearchToolUserLocation {
    type: 'approximate';
    city?: string;
    country?: string;
    region?: string;
    timezone?: string;
}

export interface MCPToolApprovalToolFilter {
    read_only?: boolean;
    tool_names?: string[];
}

export type Metadata = Record<string, string>;

export interface Prompt {
    id: string;
    variables?: Record<string, string | InputItemContent>;
    version?: string;
}

export interface TextResponse {
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

export interface Reasoning {
    effort?: LowMedHigh | 'minimal';
    generate_summary?: ReasoningSummary;
    summary?: ReasoningSummary;
}

export type ToolChoise = Mode
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

export type Tool = {
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
