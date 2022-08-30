import { prepare } from '../test/TestAbstract';

// Mock Logger module
jest.mock('@orchesty/nodejs-sdk/dist/lib/Logger/Logger', () => ({
  error: () => jest.fn(),
  info: () => jest.fn(),
  debug: () => jest.fn(),
  log: () => jest.fn(),
  createCtx: () => jest.fn(),
  ctxFromDto: () => jest.fn(),
  ctxFromReq: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

jest.setTimeout(10000);

beforeAll(async () => {
  await prepare();
})

afterAll(async () => {
  // await dropCollection(ApplicationInstall.getCollection()).then(closeConnection)
})
