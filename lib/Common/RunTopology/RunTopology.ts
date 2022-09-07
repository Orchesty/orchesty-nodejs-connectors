import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'run-topology';

export default class RunTopology extends AConnector {

    public constructor(
        private readonly runner: TopologyRunner,
        private readonly topology: string,
        private readonly node: string,
    ) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        await this.runner.runByName(
            dto.getJsonData() as Record<string, unknown>,
            this.topology,
            this.node,
            dto,
            dto.getUser(),
        );

        return dto;
    }

}
