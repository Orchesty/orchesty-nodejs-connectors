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

export default class MockDate extends Date {
  constructor() {
    super("2022-01-01T11:12:58.135Z");
  }
}

const originalDate = global.Date;

export function mockDate() {
  // @ts-ignore
  global.Date = MockDate;
}

export function restoreDate() {
  global.Date = originalDate;
}
