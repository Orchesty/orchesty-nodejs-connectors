import ACommonNode from '@orchesty/nodejs-sdk/dist/lib/Commons/ACommonNode';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const NAME = 'event-status-filter';

export default class EventStatusFilter extends ACommonNode {

    public constructor(private readonly type: string) {
        super();
    }

    public getName(): string {
        return `${NAME}_${this.type}`;
    }

    public processAction(dto: ProcessDto<IInput>): ProcessDto<IInput> {
        const data = dto.getJsonData();
        if (data.type !== this.type) {
            dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Filtered out!');
        }

        return dto;
    }

}

export interface IInput {
    type: string;
    data: {
        topologyId: string;
        correlationId: string;
        processId: string;
        user: string;
        timestampMs: number;
        resultMessage: string;
    };
}
