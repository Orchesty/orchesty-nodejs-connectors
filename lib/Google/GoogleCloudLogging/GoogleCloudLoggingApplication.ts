import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const NAME = 'google-cloud-logging';

export const BASE_URL = 'https://logging.googleapis.com';

export default class GoogleCloudLoggingApplication extends AGoogle {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'GoogleCloudLogging';
    }

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'Fully managed, real-time log management with storage, search, analysis, and alerting at exabyte scale.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZWE0MzM1O30uY2xzLTJ7ZmlsbDojNDI4NWY0O30uY2xzLTN7ZmlsbDojMzRhODUzO30uY2xzLTR7ZmlsbDojZmJiYzA1O30uY2xzLTV7ZmlsbDojNWY2MzY4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMS44NSw3LjQxbDEsMCwyLjg1LTIuODUuMTQtMS4yMUExMi44MSwxMi44MSwwLDAsMCw1LDkuNmExLjU1LDEuNTUsMCwwLDEsMS0uMDZsNS43LS45NHMuMjktLjQ4LjQ0LS40NWE3LjExLDcuMTEsMCwwLDEsOS43My0uNzRaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjkuNzYsOS42YTEyLjg0LDEyLjg0LDAsMCwwLTMuODctNi4yNGwtNCw0QTcuMTEsNy4xMSwwLDAsMSwyNC41LDEzdi43MWEzLjU2LDMuNTYsMCwxLDEsMCw3LjEySDE3LjM4bC0uNzEuNzJ2NC4yN2wuNzEuNzFIMjQuNUE5LjI2LDkuMjYsMCwwLDAsMjkuNzYsOS42WiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTEwLjI1LDI2LjQ5aDcuMTJ2LTUuN0gxMC4yNWEzLjU0LDMuNTQsMCwwLDEtMS40Ny0uMzJsLTEsLjMxTDQuOTEsMjMuNjNsLS4yNSwxQTkuMjEsOS4yMSwwLDAsMCwxMC4yNSwyNi40OVoiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xMC4yNSw4QTkuMjYsOS4yNiwwLDAsMCw0LjY2LDI0LjZsNC4xMy00LjEzYTMuNTYsMy41NiwwLDEsMSw0LjcxLTQuNzFsNC4xMy00LjEzQTkuMjUsOS4yNSwwLDAsMCwxMC4yNSw4WiIvPjwvc3ZnPg==';
    }

    public getScopes(_applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/logging.admin'];
    }

}
