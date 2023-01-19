import { createPipelineRequest, PipelineRequest, PipelineRequestOptions } from '@azure/core-rest-pipeline';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export default abstract class AAzureObjectConnector extends AConnector {

    protected abstract getCustomId(): string;

    protected abstract getBaseUrl(organization: string): string;

    protected checkParameters(parameters: string[], content: Record<string, unknown>): void {
        parameters.forEach((parameter) => {
            if (!(parameter in content)) {
                throw Error(`Required parameter [${parameter}] is not provided!`);
            }
        });
    }

    protected getPipelineRequest(
        organization: string,
        path: string,
        method: HttpMethods,
        pipelineRequestOptions?: PipelineRequestOptions,
    ): PipelineRequest {
        return createPipelineRequest({
            url: `${this.getBaseUrl(organization)}/${path}`,
            method,
            ...pipelineRequestOptions,
        });
    }

}
