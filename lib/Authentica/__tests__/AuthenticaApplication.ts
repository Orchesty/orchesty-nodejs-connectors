import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { container, redis } from '../../../test/TestAbstract';
import AuthenticaApplication, { NAME as Authentica } from '../AuthenticaApplication';
import init from '../../../test/Implementation/authentica';

let app: AuthenticaApplication;
let appInstall: ApplicationInstall;

describe('Tests for AuthenticaApplication', () => {
  beforeAll(async () => {
    appInstall = await init();
    app = container.getApplication(Authentica) as AuthenticaApplication;
  });

  beforeEach(async () => {
    await redis.remove('authentica_cache_key');
  });

  it('should get name', () => {
    expect(app.getName()).toEqual('authentica');
  });

  it('should get public name', () => {
    expect(app.getPublicName()).toEqual('Authentica Application');
  });

  it('should get description', () => {
    expect(app.getDescription()).toEqual('Authentica Application description');
  });

  it('should get logo', () => {
    expect(app.getLogo()).toBeNull();
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
      JSON.stringify({ test: 'test' }),
    );
    expect(requestDto.url).toEqual('https://app.authentica.com/api/applinth/orders');
    expect(requestDto.method).toEqual(HttpMethods.GET);
    expect(requestDto.body).toEqual(JSON.stringify({ test: 'test' }));
  });
});
