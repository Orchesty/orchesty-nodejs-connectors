import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { EventEnum } from '../src/Events/EventEnum';
import EventStatusFilter from '../src/EventStatusFilter/EventStatusFilter';

export default function init(): void {
    const eventStatusFilter = new EventStatusFilter(EventEnum.PROCESS_SUCCESS);
    container.setCustomNode(eventStatusFilter);
}
