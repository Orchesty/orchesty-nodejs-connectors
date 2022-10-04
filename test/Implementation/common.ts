import { EventEnum } from '../../lib/Common/Events/EventEnum';
import EventStatusFilter from '../../lib/Common/EventStatusFilter/EventStatusFilter';
import { container } from '../TestAbstract';

export default function init(): void {
    const eventStatusFilter = new EventStatusFilter(EventEnum.PROCESS_SUCCESS);
    container.setCustomNode(eventStatusFilter);
}
