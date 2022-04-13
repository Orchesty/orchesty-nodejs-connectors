import {
  ABasicApplication,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import CacheService from 'pipes-nodejs-sdk/dist/lib/Cache/CacheService';
import logger from 'pipes-nodejs-sdk/dist/lib/Logger/Logger';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';

const NAME = 'MONEYS5';
const BASE_URL = 'https://{host}/';
const AUTH_TOKEN_URL = 'connect/token';
const MONEYS5_URL = 'moneys5Url';

export default class MoneyS5Application extends ABasicApplication {
  constructor(
    private _cache: CacheService,
  ) {
    super();
  }

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'The Money S5 enterprise information ERP system is designed for companies that need a robust, powerful and secure solution with data stored in SQL Server, a high level of customizability and solutions to individual requirements for functionality and business process management.';

  public getName = (): string => NAME;

  public getPublicName = (): string => 'MoneyS5';

  public async getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): Promise<RequestDto> {
    const headers = {
      [CommonHeaders.AUTHORIZATION]: await this.getApiToken(applicationInstall, dto),
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
    };

    let urlx = url || '';
    if (!urlx.startsWith('http')) {
      urlx = `${this.getDecoratedUrl(applicationInstall)}/${urlx}`;
    }

    const requestDto = new RequestDto(
      urlx,
      parseHttpMethod(method),
      dto,
      data,
      headers,
    );
    requestDto.debugInfo = dto;
    return requestDto;
  }

  public getApiToken = async (
    applicationInstall: ApplicationInstall,
    processDto: ProcessDto,
  ): Promise<string> => {
    try {
      const cacheKey = `${
        NAME
      }ApiKey_${applicationInstall.getUser()}`;
      const headers = {
        [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
        [CommonHeaders.ACCEPT]: JSON_TYPE,
      };
      const requestDto = new RequestDto(
        `${BASE_URL}${AUTH_TOKEN_URL}`,
        HttpMethods.GET,
        processDto,
        undefined,
        headers,
      );
      return await this._cache.entry(
        cacheKey,
        requestDto,
        // eslint-disable-next-line @typescript-eslint/require-await
        async (dto) => {
          const dtoBody = dto.jsonBody as IResponseJson;
          return {
            expire: Number(dtoBody.expires_in),
            dataToStore: dtoBody.access_token,
          };
        },
        [200],
      );
    } catch (e) {
      if (e instanceof Error) {
        logger.error(e.message || 'Unknown error in Money S5 application.');
      }
      throw e;
    }
  };

  public getDecoratedUrl = (app: ApplicationInstall): string => app.getSettings()?.[FORM]?.[MONEYS5_URL] ?? '';

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client ID', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secter', undefined, true))
    .addField(new Field(FieldType.TEXT, MONEYS5_URL, 'Url', undefined, true));

  public getLogo = (): string => 'data:image/png;base64,'
    // eslint-disable-next-line max-len
    + 'iVBORw0KGgoAAAANSUhEUgAAAFgAAACECAYAAAAUaexgAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpSqVonYQcchQnSyIijhqFYpQIdQKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxdHJSdJES/5cUWsR4cNyPd/ced+8Af73MVLNjHFA1y0gl4kImuyoEXxFAP7rRh7DETH1OFJPwHF/38PH1LsazvM/9OXqVnMkAn0A8y3TDIt4gnt60dM77xBFWlBTic+Ixgy5I/Mh12eU3zgWH/TwzYqRT88QRYqHQxnIbs6KhEk8RRxVVo3x/xmWF8xZntVxlzXvyF4Zy2soy12kOI4FFLEGEABlVlFCGhRitGikmUrQf9/APOX6RXDK5SmDkWEAFKiTHD/4Hv7s185MTblIoDnS+2PbHCBDcBRo12/4+tu3GCRB4Bq60lr9SB2Y+Sa+1tOgREN4GLq5bmrwHXO4Ag0+6ZEiOFKDpz+eB9zP6piwwcAv0rLm9Nfdx+gCkqavkDXBwCIwWKHvd491d7b39e6bZ3w8KPXJ9ga5RNQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+YDEgkTBNgqCf8AAArWSURBVHja7Z1rkBxVFcf/59yeyWsD8hA1oCIUKAjyKAh5QFihTNydmU0WskAQEMVCoYQopaKl8vpAqRRYYImShFShksgjr52ZjZEEEPNggSBViIIgiEVIVB6ahGyy0/ccP+ywBKgkPTPdPX0nfb4lu917+9enzzn33nPOBVJJJZVUUkklFXelksOkZv1tbmWw2gNTKfCPiHiNzfFlzRgDtTDcNjtACwAqVJ+0osodmZK/KgXcKNwOHCKGexU44T0/etOITKA+/C0FXK+9zWMigZcA+NAufuVFQ3IKFfFaaoNrFD9nziPwqt3ABYDDLMwi7UE2BRzUJABUyfN1IF0AYNSeL9ApdoB/kZqIIHCnYozN0q8B6q7j4b9hSnJrCnhXcLswzlqzDKQn1XkLAdF0r2hLKeD3yGAnjmfmXgAfbfBWW6zI5BF9eDq1wW87s7yZycxrQoALAGMNca9246C9HrACZHN8NaD3ABgd4nd8qB00i7UDI8Ies+fQ5GGENTwXwIXRGEudbA3PAeSLe50GawEHWmMeiAzuO3KRLfB39yont6MTxxrmIoCPx2aJiM7zivbelgfsF0wHVH8LYJ+Y//SAkJyeLeLxljURNs+zoVpqAlwAGMXKS7UDh7ScBmsPsnaAfwngS80eCwFPMslpVMS2ltBgnYb97QCtSALcalh4olW6SxtQxMQA1jyO8DO8FqD2ZH1TNNPP87VOm4hKl/c5ErkXwAcSPMe50CvZu50DbPP8dQV+6sCkZ7uItGf70O8EYO2B8Qf4FgKudGi2vqm6G/LPRAPWLoy1SguhlINjQsAzbGUSLcfmRDo57cDhvnC/i3CrxvjT1tBC7YFJHOBKHu3WcD8BR8FtsUCwPb3YAPs582UCrwBwgMtkFbjNjNJuug8DibDBCpCf52sJuNZxrfWJMNsU5fZaLoo0NNIetNlt9BsCpjsO9w1VnumV/IcSEwdXs2uWKXCi4ybheY+lQL14LjFT5cECJljDT7gOF6oPeJ6MrxduJID9vDmXlR/E7rNrXAh455hNmqOl+G+DcXPozuwauJ1vYYlwlSnKbSFNTEKA246Rto3vBHC+485sC5RmeWVbDnHm1/C0d5wVsxTQkx2H+6IxUqBl+EuYNzWNXDyYx3FQXgXgaLedGa0xWZlKS/GPsG9dt5PzC+ZsBq8F8DHHNXe+GW3PoCX4dzS+sh4vkOfZCtwCt9NfVYEbMiW5LtpgpLbJw4ih7Bdc5LjWbgXRBV7RLos+2gsKtxsHWN8shuoUx+FuEJKubBFPxhNOB5AdORxjwEUQDnWbLT1qxHZTHzbF9Rf3aEMrBZxuiNe6DxcLzFb72TjhAgFW0zzgGQv8B8BYZ50Z4SdeUb5HgMY/4w4ywuk42gqvhWJfx+BuB9ElXtEuaNYAAoVZQ7MbmoWhrRJHzC02CsmUZsKtaaLhFe1yUlztBltab1RODiM7MtaZnCnLzVDckXCTu4jJTqESNiRhNDXPxMwmuQLQBxOJFrjNnKTnNJINmYipsk7D/n6GHyXgiIQ8xw6ALvVK9lfJM1f1aksXPmmF1wHYr8nP8LqKnJXpwyNJ/KrqXqyhXjynzOcC8JuoHX82npyUVLgNAQaATK//AIgua87QdQVvl1ODruFqe3OyNxtebvSKdh6An8esunPMVs3TSvwvENwcDpM2fsovmHOcscHveoAeGLudlsWQ0OdXK+QDv9BKDpOIeAmAgxBi9VCsgAFAO7CPGF6jwDERjfUNJe7JFP3AIaJfMLOgOh/AyJ3++1Vj5RRajlecMBHDb2o5NjNJF4YWhsKWFwzJ5KBwhxt0qC54D1wAGCeGl2khxFrnOAADABXxkpKcNRSXhvZtrDQq46mIZwP99lSMsXlavLtkwzCqh5oCGAAyRawG0ddCut1cs1E7qYw3A8HN42DJmj8ANCOAOjRUPRS7DX6/c+GbiPCtOi+3pPi+KcuPg14w2IUTWLgXqKk6s+7qoaZp8HD4drJcDdV6NhW3ANRdC1w/Z3pYeHWNcKsKpvMGC5jgnAZXw7c2GeDVChwX8JIXLUnXiCKeCap+kuPvKOHGBpWl5uqhRAB+2y5acD+Ag/cwlLUmY7uDJoBoB0ZYj+dBcUFIIGqqHmq6iRgeeAkbRGQGsJslRMVCs9WeGRjuNHzEGvNIWHCrX0NN1UOJAQwA2T48AaWL8f5NR1Xgeq8s59PD2B7kXju68Bmb4XWAjo9AHTr9Ab7RKRPxrsiiwDeQ4ofVf75Vza5ZGtiZ5U0noAsReQ8JutQr2bnOAa52jbobhCmiMj1bxvrAcVuc+XCEigpPy5RrL3ppKuBqZDEKb2HfoAkg2oOs3cZ3gHBxzEN93bBMoF684BTgml5GNw6wFbq/WT0kFHjW82RiI3UaiU0/1U4c6Vea26CDgE9Zn+5pZLE+kYArBW+qZe4n4Mjmj4am+m18c8sAtjlzKamUkaDuJwRcaQt8udM2WNvh2bF8CxRXJNRq+arckSn7K50DrDnsZ4nuA+hMJFs2W5JJQddKEgFYO3C4b7joUA+Jl6pbToF2bppqgysFnGoNr3OsQccnrAneZL9pgP2CuYSGauw+COdET6t2J0zkTM742/gmInwTbsugJTlxT/bYixlumx2gu4nQ5Tjc1xUyM4izi02Dd3P8jVvGAXjeE8kHPa4nFhtcyWNitUHHCW4rrv7e82R8LWchRQ7Yz5tzAxx/k3wZyoeruUEHRfgptUqDDp8UV5my/KyeiyNxctqOkXYMzydgluPObDNAs0zZ9jWwjhEy3MaPv0mKSfi7ESlQGX9t5Dah7qAOduJ4gFeBXG+dSKuNlanUh5cbvVNoTs4vmLNDPP6mmXHYnWaUPTPoWkPkJiLE7JpmS835cJE7uZZq0KH0BVO2veGb8nrhFnCghVnUAg06XhGWrmwv/hTFzetycjs6cSzADyF4Ul9SndmjhuUMr8Gt+VCdXKXT+7wx/McWaNBxjxllz6Be/CvaaK8WLzCUXXNz2OFd3HGCAjd4Jbk+jgYdwRpytMOzY/hWEC53XGtjb9ARLIoYjYNBOMdxuBtEZXq2FDwfLjYbTH14WUm6EWr1UJyzXjxlSCbVkmwYu5PLFLEaSl910OQuYpLJUZQHhB5FeGV7lwI3uTPrbX6DjponGnod2D5Oi0GU5Mb3iWnQUV/Hk9qrh+KU11Tk7KT0kGik48k4K/wY9lg9FOPDEJ5mI11R9AGObSY3/DC9eFVUpgMJaUBE+jsekNOSBLchwACQLWP9LqqH4ndmI4M36HDCRLxrfSLH1xPhmiaMv67jb5wDvFP1UJybnG+o8swwKoESayJ2ektqRsslIOqPadwvGJZJSYcbmgYPa3InPmyZH0Ok+3K60nja0+gJLU5p8E5rFptEpAvAWxGpwxyzUTtdgRu6Bg97nrzpBvT+EF9gJBuSzmnw8JpFyS4h4Ach3W4LiGa4CDcyDX5Hk3kugK80cItIjr9xXoPfFrNRLgf04fp8Ga0xGZnoMtzIAdN6VExGZwI179pGevxNy5iIYWXM4SjLvC5Ak/1Yjr9pOcBD02lvGpGUsOt9wK0gurCWBh17vYnYWTJlfwUpvr2LH28QlfZWgxurBg9HFgW+HYp3eg4T9RtrZ8R9QkvLafBwZPGqzAZ0VfX13mdGxn/8TcuLTsP+NsdXqNu1G6mkkkoqqaSSSiqppJJKKs2R/wP0hRtRKadKkwAAAABJRU5ErkJggg==';
}

interface IResponseJson {
  /* eslint-disable @typescript-eslint/naming-convention */
  access_token: string
  expires_in: string,
  token_type: string
  /* eslint-enable @typescript-eslint/naming-convention */
}
