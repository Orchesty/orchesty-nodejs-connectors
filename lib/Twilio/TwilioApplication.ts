import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';

export const BASE_URL = 'https://api.twilio.com/2010-04-01';

export default class TwilioApplication extends ABasicApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Twilio is a cloud communication company that enables users to use standard web languages to build voice, VoIP, and SMS apps via a web API';

  public getName = (): string => 'twilio';

  public getPublicName = (): string => 'Twilio';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const userName = applicationInstall.getSettings()[FORM][USER];
    const password = applicationInstall.getSettings()[FORM][PASSWORD];

    const headers = new Headers({
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userName}:${password}`)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, data, headers);
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, USER, 'ACCOUNT SID', undefined, true))
    .addField(new Field(FieldType.PASSWORD, PASSWORD, 'AUTH TOKEN', undefined, true));

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0gAAANbCAYAAAB4pb/uAAAgAElEQVR4nOy96bMkSXIf9ouqelff1/RMz4HZxS52sccMCS6OxeIyE0UIJtIIATJ9kJn4gTJ90AdJX2Smf0QyUofRBJIm0SgasABoxBIAlwQxe2J35766p6/p6fN19zvrvboyM/Qh43D38Myq7nqNqe6On830y8qM8HD3iMx0D/eINNZaiwPE1tYWDoqkMQYnTpw4EFoemb/5kPmbH4vOY+ZvPmT+5sei85j5mw+Zv4PDovOa+ZsPmb+Dw4Py2gNwYMJ5WgdN7yCR+Zuf3tPGnzEm3yNz0jtIZP7mp5fvkfnpZf7mo/e08pfvlfnpHSQyf/PTe1Lvlc6BtZyRkZGRkZGRkZGRkfGYIztIGRkZGRkZGRkZGRkZDtlBysjIyMjIyMjIyMjIcMgOUkZGRkZGRkZGRkZGhkN2kDIyMjIyMjIyMjIyMhyyg5SRkZGRkZGRkZGRkeGQHaSMjIyMjIyMjIyMjAyH7CBlZGRkZGRkZGRkZGQ4ZAcpIyMjIyMjIyMjIyPDITtIGRkZGRkZGRkZGRkZDr1Pm4GMjIyMjMcDdjKBnUxQDQbAaAwDYHh/A7AWtihgyxK2LIHxpP5bVagmE8BaVEUB+HOjEWAtUBaoiiqUMx0DYzoYTArAAFjqAp0uYDroLPcAY2B6S0CvC3Q6ML0e0OkA3S463S7Q7cIsLQFdf70L0+uhNB2YtTV0lpc+bRVmZGRkZDwGyA5SRkZGxhOKajwByqJ2bIoStpig2NhEVZbAeAxrLeDOo6pgx2OgsrWj485hUtROTlUBk9rxsZMJMCkAa1GurNQOUlUBRRFowlawlTtfVcGJAmpHC7aq26rqcqgKwHRgjMG4KGBNB6ZjamcHgOl1awfJOT8wpnaUABjTiee7XaBjalrdDkynAxw7DrO8XDtMS0v1326vptntwiy5a97B6nTQWeoB3R5MpwOzsgxjOkCvi87SEqq9PWBlpeankxMxMjIyMp40ZAcpIyMj40lEVcGORqj291FsbsGORij3+hit30M1GsHubMFOClT7A1R7e7DjMez2DuxwVJfd3amjQrt7KPf2UI1GMJMJjDFJUxZ1wEeDtYCBrR2ah4HldWlbst30Wv3vJlA7bgYwJ0+gu7KC3tohdI4dAZaW0Dt+Ap21VXRXV9E5ehSdlRV0jxxG59Ch+vjkSXSWltA5tIbOkSMoRyN0zpyOTllGRkZGxhOF7CBlZGRkPAaoBgNUoxEm9+7BjsYod3dR7uyiGg5Q3N+AHQ5Q9vdqZ2g4qs+56E01riM2tixQTAqgskDhIkhl5dLhbJ0CV5awPtoTrhcwVVUzQhwWay2MMdDdlxrGeCfJXVW9KX6S/fLOkWuXVpVk0muG/bYwQL+Pcm8fVWcHWK8jTKNuD6bnok3dbvzb7dVpf12XytfroNPtoawsbK8Hs9JDZ2UF5sQJdFbX0Dl2DJ3Dh2BWV9E9eQJmZRWdo0fQOXIEndVVdE6eqFP/slOVkZGRsdBYaAfJGBNewIuIzN98yPzNj0XnMfPXjpB+5pyScFxZwFboABiPJzDWotzr1w7SzduohkMUm1soNjdhBwNM7t5F';
}
