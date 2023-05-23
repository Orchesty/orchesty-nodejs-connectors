import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { init, mock } from '../../../test/Implementation/authentica';
import { container, redis } from '../../../test/TestAbstract';
import AuthenticaApplication, { NAME as Authentica } from '../AuthenticaApplication';

let app: AuthenticaApplication;
let appInstall: ApplicationInstall;

describe('Tests for AuthenticaApplication', () => {
    beforeAll(() => {
        init();
        app = container.getApplication(Authentica) as AuthenticaApplication;
    });

    beforeEach(async () => {
        appInstall = mock();
        await redis.remove('authentica_cache_key');
    });

    it('should get name', () => {
        expect(app.getName()).toEqual('authentica');
    });

    it('should get public name', () => {
        expect(app.getPublicName()).toEqual('Authentica Fulfillment');
    });

    it('should get requestDto', async () => {
        await redis.set(
            'authentica_cache_key',
            JSON.stringify({
                expiration: 1759965308,
                /* eslint-disable @typescript-eslint/naming-convention */
                access_token: 'testAccessToken',
                refresh_token: 'testRefreshToken',
                refresh_token_expiration: 1759965308,
                /* eslint-enable @typescript-eslint/naming-convention */
            }),
            4,
        );

        const requestDto = await app.getRequestDto(
            new ProcessDto(),
            appInstall,
            HttpMethods.GET,
            'orders',
            { test: 'test' },
        );
        expect(requestDto.getUrl()).toEqual('https://app.authentica.cz/api/applinth/orders');
        expect(requestDto.getMethod()).toEqual(HttpMethods.GET);
        expect(requestDto.getBody()).toEqual(JSON.stringify({ test: 'test' }));
    });
});
