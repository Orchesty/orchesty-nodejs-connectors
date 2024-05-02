import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const PINYA_EMPLOYEES_BATCH = 'pinya-employees-batch';

export default class PinyaEmployeesBatch extends ABatchNode {

    public constructor(resultAsBatch = false, protected batchSize = 50) {
        super(resultAsBatch);
    }

    public getName(): string {
        return PINYA_EMPLOYEES_BATCH;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `employees?${this.processFilter(dto)}`,
        );
        const resp = await this.getSender().send<Response>(req);
        const response = resp.getJsonBody();
        this.processResult(dto, response);

        if (response.lastPage > response.pageNumber) {
            dto.setBatchCursor((response.pageNumber + 1).toString());
        } else {
            dto.removeBatchCursor();
        }

        return dto;
    }

    protected processFilter(dto: BatchProcessDto): string {
        const page = Number(dto.getBatchCursor('1'));

        return `PageNumber=${page}&PageSize=${this.batchSize}`;
    }

    protected processResult(dto: BatchProcessDto, response: Response): BatchProcessDto {
        return dto.setItemList(response.data, this.resultAsBatch);
    }

}

export interface IInput {

}

export interface PinyaEmployeesOutput {
    employeeBasic: {
        employeeGuid: string;
        employeeNumber: string;
        startDate: string;
        endDate: string;
        terminationWay: string;
        terminationReason: string;
        firstname: string;
        lastname: string;
        middlename: string;
        degrees: string;
        degreesBehind: string;
        workEmail: string;
        workPhoneNumber: string;
        workMobilePhoneNumber: string;
        languageSkills: {
            id: number;
            title: string;
            code: string;
        }[];
        computerSkills: {
            id: number;
            title: string;
            code: string;
        } [];
        skills: string;
        contractNumber: string;
        contractStartDate: string;
        endOfProbation: string;
        contractEndDate: string;
        contractType: {
            id: number;
            title: string;
            code: string;
        },
        contractValidity: string;
        fte: number;
        employmentStatus: {
            id: number;
            title: string;
            code: string;
        },
        company: {
            id: number;
            title: string;
            code: string;
        },
        location: {
            id: number;
            title: string;
            code: string;
        },
        workplace: {
            id: number;
            title: string;
            code: string;
        },
        division: {
            id: number;
            title: string;
            code: string;
        },
        department: {
            id: number;
            title: string;
            code: string;
        },
        jobTitle: {
            id: number;
            title: string;
            code: string;
        },
        jobLevel: {
            id: number;
            title: string;
            code: string;
        },
        specialization: {
            id: number;
            title: string;
            code: string;
        },
        superior: {
            employeeGuid: string;
            employeeNumber: string;
            employeeName: string;
        },
        approver: {
            employeeGuid: string;
            employeeNumber: string;
            employeeName: string;
        },
        dayShift: number;
        weekHours: number;
        hoursSchedule: string;
        vacationClaim: number;
        unpaidLeaveClaim: number;
        sickDaysClaim: number;
        homeOfficeClaim: number;
    },
    employeePersonal: {
        birthDate: string;
        gender: {
            id: number;
            title: string;
            code: string;
        },
        maritalStatus: {
            id: number;
            title: string;
            code: string;
        },
        nationality: string;
        healthInsuranceProvider: {
            id: number;
            title: string;
            code: string;
        },
        healthInsuranceNumber: string;
        taxNumber: string;
        personalEmail: string;
        maidenname: string;
        birthCertNumber: string;
        birthPlace: string;
        numberOfChildren: number;
        street: string;
        houseNumber: string;
        postalCode: string;
        city: string;
        country: string;
        contactStreet: string;
        contactHouseNumber: string;
        contactPostalCode: string;
        contactCity: string;
        contactCountry: string;
        personalPhoneNumber: string;
        emergencyName: string;
        emergencyPhone: string;
        idCardNumber: string;
        idCardValidTo: string;
        passportNumber: string;
        passportValidTo: string;
        drivingLicenceNumber: string;
        drivingLicenceValidTo: string;
        drivingLicenceGroup: string;
        bankName: string;
        bankPrefix: string;
        bankAccount: string;
        bankCode: string;
        iban: string;
        customFields: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
        }
    },
    employeeWage: {
        currency: {
            id: number;
            title: string;
            code: string;
        },
        basicWage: number;
        personalBonus: number;
        grossWage: number;
        netWage: number;
        hourlyWage: number;
        agreementExpenses: number;
        invoiceExpenses: number;
        expenses: number;
        transportationBonus: number;
        retirementInsurrance: number;
        otherBonus: number;
        bonus: {
            id: number,
            title: string;
            code: string;
        },
        customFields: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
        }
    }
}

interface Response {
    pageNumber: number;
    pageSize: number;
    lastPage: number;
    totalItemsCount: number;
    count: number;
    data: PinyaEmployeesOutput[];
}
