import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { BASE_PATH, getErrorInResponse, NAME as APPLICATION_NAME } from '../OpenAIApplication';

export const NAME = `${APPLICATION_NAME}-post-invoice-label-connector`;

export default class OpenAIPostResponseConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const data = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `${BASE_PATH}/v1/responses`,
            data,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, {
            success: StatusCodes.OK,
            stopAndFail: [StatusCodes.BAD_REQUEST],
        }, undefined, undefined, getErrorInResponse);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    model: string;
    input: string;
}

export interface IMessageContent {
    text: string;
}

export interface IMessageOutput {
    content: IMessageContent[];
}

export interface IOutput {
    output: IMessageOutput[];
}
