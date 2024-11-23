import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { initAuthenticaTest, mock } from '../../../test/Implementation/authentica';
import { container, redis } from '../../../test/TestAbstract';
import { NAME } from '../../GitHub/GitHubApplication';
import AuthenticaApplication, { NAME as Authentica } from '../AuthenticaApplication';

let app: AuthenticaApplication;

describe('Tests for AuthenticaApplication', () => {
    beforeAll(async () => {
        await initAuthenticaTest();
        app = container.getApplication(Authentica) as AuthenticaApplication;
    });

    afterAll(async () => {
        await redis.close();
    });

    it('should get name', () => {
        expect(app.getName()).toEqual('authentica');
    });

    it('should get public name', () => {
        expect(app.getPublicName()).toEqual('Authentica Fulfillment');
    });

    it('should get requestDto', async () => {
        const requestDto = await app.getRequestDto(
            ProcessDto.createForFormRequest(NAME, Authentica, crypto.randomUUID()),
            mock(),
            HttpMethods.GET,
            'applinth/orders',
            { test: 'test' },
        );

        expect(requestDto.getUrl()).toEqual('https://app.authentica.cz/api/applinth/orders');
        expect(requestDto.getMethod()).toEqual(HttpMethods.GET);
        expect(requestDto.getBody()).toEqual(JSON.stringify({ test: 'test' }));
    });
});
