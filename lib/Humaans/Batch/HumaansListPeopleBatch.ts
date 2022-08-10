import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'humaans-list-people-batch';

export default class HumaansListPeopleBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const skip = Number(dto.getBatchCursor('1'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/people?skip=${skip}&limit=100`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.total >= response.limit) {
      dto.setBatchCursor((skip + response.limit).toString());
    }

    return dto;
  }
}

interface IResponse {
    total: number,
    limit: number,
    skip: number,
    data: [
        {
            id: string,
            companyId: string,
            firstName: string,
            lastName: string,
            email: string,
            locationId: string,
            personalEmail: string,
            phoneNumber: string,
            formattedPhoneNumber: string,
            gender: string,
            birthday: string,
            profilePhotoId: string,
            profilePhoto: {
                id: string,
                variants: {
                    64: string,
                    96: string,
                    104: string,
                    136: string,
                    156: string,
                    204: string,
                    320: string,
                    480: string
                }
            },
            nationality: string,
            nationalities: [
                string
            ],
            dietaryPreference: string,
            foodAllergies: [
                string
            ],
            address: string,
            city: string,
            postcode: string,
            countryCode: string,
            country: string,
            bio: string,
            employmentStartDate: string,
            firstWorkingDay: string,
            lastWorkingDay: string,
            contractType: string,
            taxId: string,
            taxCode: string,
            teams: {
                name: string
            }[],
            status: string,
            isVerified: boolean,
            isWorkEmailHidden: boolean,
            calendarFeedToken: string,
            role: string,
            seenDocumentsAt: string,
            timezone: string,
            createdAt: string,
            updatedAt: string
        }
    ]
}
