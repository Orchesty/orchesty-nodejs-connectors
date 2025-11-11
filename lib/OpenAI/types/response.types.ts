/* eslint-disable @typescript-eslint/naming-convention */
import {
    Conversation,
    FailStatus,
    InputItem,
    Item,
    Metadata,
    Prompt,
    Reasoning,
    ServiceTier,
    TextResponse,
    Tool,
    ToolChoise,
    Truncation,
} from './request.types';

export interface OpenAIResponse {
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

export interface Usage {
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
