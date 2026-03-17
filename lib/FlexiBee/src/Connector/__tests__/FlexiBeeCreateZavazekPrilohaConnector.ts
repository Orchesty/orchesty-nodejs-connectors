import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../test/dataProvider';
import { NAME as FLEXI_BEE_CREATE_ZAVAZEK_PRILOHA } from '../FlexiBeeCreateZavazekPrilohaConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeCreateZavazekPrilohaConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_CREATE_ZAVAZEK_PRILOHA);
    });
});
