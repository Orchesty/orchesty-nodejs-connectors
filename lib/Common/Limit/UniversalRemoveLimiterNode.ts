import ACommonNode from '@orchesty/nodejs-sdk/dist/lib/Commons/ACommonNode';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export default class UniversalRemoveLimiterNode extends ACommonNode {

    public constructor(private readonly name: string) {
        super();
    }

    public getName(): string {
        return this.name;
    }

    public processAction(dto: ProcessDto): ProcessDto {
        dto.removeLimiter();
        return dto;
    }

}
