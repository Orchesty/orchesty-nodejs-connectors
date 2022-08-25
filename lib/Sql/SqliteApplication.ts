import ASqlApplication, { IDialect } from './Common/ASqlApplication';

export default class SqliteApplication extends ASqlApplication {

    public constructor() {
        super(IDialect.sqlite);
    }

    public getPublicName(): string {
        return 'SQLite';
    }

    public getDescription(): string {
        return 'SQLite is an in-process library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine.';
    }

    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

}
