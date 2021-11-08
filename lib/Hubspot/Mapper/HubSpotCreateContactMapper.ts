import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from 'pipes-nodejs-sdk/dist/lib/Utils/ResultCode';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';

interface IWrapBody {
  properties: IBody[];
}

interface IBody {
  property: string,
  value?: IOrderJson | IOrderCredentialsJson | string | null
}

interface IInputJson {
  orders: [IOrderJson];
}

interface IOrderJson {
  billTo: IOrderCredentialsJson,
  shipTo: IOrderCredentialsJson,
}

interface IOrderCredentialsJson {
  firstName?: string,
  lastName?: string,
  streets?: string,
  name?: string,
  street1?: string,
  street2?: string,
  street3?: string,
}

export default class HubSpotCreateContactMapper extends ACommonNode {
  public getName = (): string => 'hub-spot-create-contact-mapper';

  public processAction(_dto: ProcessDto): Promise<ProcessDto> | ProcessDto {
    const dto = _dto;
    const body = (dto.jsonData as IInputJson).orders[0] ?? null;

    if (!body) {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'The body of ProcessDto couldn\'t be decoded from json.');
      return dto;
    }

    dto.jsonData = this.createBody(body);
    return dto;
  }

  public createBody(_data: IOrderJson): IWrapBody {
    const array: IBody[] = [];
    const fields = this.requestedFields();
    const data = this.formatData(_data);
    let i = 0;

    Object.entries((fields))
      .forEach(([key, field]) => {
        array[i].property = key;
        switch (true) {
          case field in data:
            array[i].value = data[field as keyof IOrderJson];
            break;
          case field in data.billTo && data.billTo[field as keyof IOrderCredentialsJson] !== null:
            array[i].value = data.billTo[field as keyof IOrderCredentialsJson];
            break;
          case field in data.shipTo:
            array[i].value = data.shipTo[field as keyof IOrderCredentialsJson];
            break;
          default:
            array[i].value = null;
        }
        i += i;
      });

    return { properties: array };
  }

  public formatData(_data: IOrderJson): IOrderJson {
    const data = _data;
    if (data.billTo && data.shipTo) {
      Object.entries((data))
        .forEach(([_invoiceKey, invoice]) => {
          const streets: string[] = [];
          const invoiceKey = _invoiceKey as unknown as keyof IOrderJson;
          Object.entries((invoice))
            .forEach(([_key, _value]) => {
              const key = _key as unknown as keyof IOrderCredentialsJson;
              const value = _value as string;
              if (key.startsWith('street')) {
                streets.push(value);
              }
            });

          const [firstName, lastName] = this.splitName(invoice.name);
          data[invoiceKey].streets = streets.join(', ');
          data[invoiceKey].firstName = firstName;
          data[invoiceKey].lastName = lastName;
        });

      return data;
    }

    throw Error('Missing billTo or shipTo data');
  }

  public splitName = (name?: string): string[] | undefined[] => {
    if (!name) {
      return [undefined, undefined];
    }
    const fullName = name.trim();
    const lastName = fullName.includes(' ') ? fullName.replace(/.*\s([\w-]*)$/, '$1') : '';
    const firstName = fullName.replace(lastName, '')
      .trim();
    return [firstName, lastName];
  };

  public requestedFields = (): Record<string, string> => ({
    email: 'customerEmail',
    firstname: 'firstName',
    lastname: 'lastname',
    website: '',
    company: 'company',
    phone: 'phone',
    address: 'streets',
    city: 'city',
    state: 'state',
    zip: 'postalCode',
  });
}
