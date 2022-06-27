// Mock Logger module
jest.mock('@orchesty/nodejs-sdk/dist/lib/Logger/Logger', () => ({
  error: () => jest.fn(),
  info: () => jest.fn(),
  debug: () => jest.fn(),
  log: () => jest.fn(),
  ctxFromDto: () => jest.fn(),
  ctxFromReq: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

beforeAll(async () => {
})

afterAll(async () => {
})
