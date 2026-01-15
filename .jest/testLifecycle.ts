import { prepare } from '../test/TestAbstract';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import {
  createLoggerMockedServer,
  createMetricsMockedServer,
} from '@orchesty/nodejs-sdk/dist/test/MockServer';

jest.setTimeout(10000);

beforeAll(() => {
  logger.logger.level = 'error';
  createLoggerMockedServer();
  createMetricsMockedServer();
  prepare();
})

afterAll(async () => {
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
