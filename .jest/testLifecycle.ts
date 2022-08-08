// Mock Logger module
import {closeConnection, dropCollection, prepare} from "../test/TestAbstract";
import {ApplicationInstall} from "@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall";

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
  await prepare();
})

afterAll(async () => {
  // await dropCollection(ApplicationInstall.getCollection());
  // await closeConnection();
})
