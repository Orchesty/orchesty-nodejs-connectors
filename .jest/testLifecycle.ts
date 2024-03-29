import { prepare } from '../test/TestAbstract';
import {
  createLoggerMockedServer,
  createMetricsMockedServer,
} from '@orchesty/nodejs-sdk/dist/test/MockServer';

jest.setTimeout(10000);

beforeAll(() => {
  createLoggerMockedServer();
  createMetricsMockedServer();
  prepare();
})

afterAll(async () => {
})

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockReturnValue({
          "accepted": [
            "neco@gmail.com"
          ],
          "envelope": {
            "from": "neco@neco.com",
            "to": [
              "neco@gmail.com"
            ]
          },
          "envelopeTime": 2,
          "messageId": "<731836a2-74d2-36f6-8053-08242c91ce1c@neco.com>",
          "messageSize": 614,
          "messageTime": 3,
          "rejected": [],
          "response": "250 Ok: queued as uDtelNMtPWAML6YfHjji5zYLhJjL1frJBtBBOZNJIcE=@mailhog.example"
        }),
    }),
}));

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
