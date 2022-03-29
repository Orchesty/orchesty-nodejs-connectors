import ASqlApplication, { IDialect } from './Common/ASqlApplication';

export default class SqlApplication extends ASqlApplication {
  constructor() {
    super(IDialect.postgres);
  }
}
