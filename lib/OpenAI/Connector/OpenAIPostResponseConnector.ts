import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { getErrorInResponse, NAME as APPLICATION_NAME } from '../OpenAIApplication';
import { OpenAIRequest } from '../types/request.types';
import { OpenAIResponse } from '../types/response.types';

export const NAME = `${APPLICATION_NAME}-post-response-connector`;

export default class OpenAIPostResponseConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<OpenAIRequest>): Promise<ProcessDto<OpenAIResponse>> {
        const data = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/v1/responses',
            data,
        );

        const responseDto = await this.getSender().send<OpenAIResponse>(requestDto, {
            success: StatusCodes.OK,
            stopAndFail: [StatusCodes.BAD_REQUEST],
        }, undefined, undefined, getErrorInResponse);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export function getOutputText(response: OpenAIResponse): string {
    return response.output
        ?.find((item) => item.type === 'message')?.content
        ?.filter((item) => item.type === 'output_text')
        .map((item) => item.text).join('') ?? '';
}
