import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_CREATE_SKLADOVY_POHYB } from '../FlexiBeeCreateSkladovyPohybConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeCreateSkladovyPohybConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_CREATE_SKLADOVY_POHYB);
    });
});
