import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'allegro-create-draft-offer-connector';

export default class AllegroCreateDraftOfferConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'sale/offers';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        dto.setJsonData(resp.getJsonBody());

        return dto;
    }

}

export interface IInput {
    additionalServices: {
        id: string;
    };
    afterSalesServices: {
        impliedWarranty: {
            id: string;
        };
        returnPolicy: {
            id: string;
        };
        warranty: {
            id: string;
        };
    };
    attachments: {
        id: string;
    }[];
    category: {
        id: string;
    };
    compatibilityList: {
        type: string;
    };
    contact: {
        id: string;
    };
    createdAt: Date;
    customParameters: {
        name: string;
        values: string[];
    }[];
    delivery: {
        additionalInfo: string;
        handlingTime: string;
        shippingRates: {
            id: string;
        };
        shipmentDate: Date;
    };
    description: {
        sections: {
            items: {
                type: string;
            }[];
        }[];
    };
    discounts: {
        wholesalePriceList: {
            id: string;
        };
    };
    external: {
        id: string;
    };
    fundraisingCampaign: {
        id: string;
    };
    id: string;
    images: {
        url: string;
    }[];
    location: {
        city: string;
        countryCode: string;
        postCode: string;
        province: string;
    };
    name: string;
    parameters: {
        id: string;
        rangeValue: {
            from: string;
            to: string;
        };
        values: string[];
        valuesIds: string[];
    }[];
    payments: {
        invoice: string;
    };
    product: {
        id: string;
    };
    promotion: {
        bold: boolean;
        departmentPage: boolean;
        emphasized: boolean;
        emphasizedHighlightBoldPackage: boolean;
        highlight: boolean;
    };
    publication: {
        duration: string;
        endingAt: Date;
        startingAt: Date;
        status: string;
        endedBy: string;
        republish: boolean;
    };
    sellingMode: {
        format: string;
        price: {
            amount: string;
            currency: string;
        };
        minimalPrice: {
            amount: string;
            currency: string;
        };
        startingPrice: {
            amount: string;
            currency: string;
        };
        netPrice: {
            amount: string;
            currency: string;
        };
    };
    tax: {
        id: string;
        rate: string;
        subject: string;
        exemption: string;
        percentage: string;
    };
    sizeTable: {
        id: string;
    };
    stock: {
        available: number;
        unit: string;
    };
    tecdocSpecification: {
        id: string;
        items: {
            name: string;
            values: string[];
        }[];
    };
    b2b: {
        buyableOnlyByBusiness: boolean;
    };
    messageToSellerSettings: {
        mode: string;
    };
    updatedAt: Date;
    validation: {
        errors: {
            code: string;
            details: string;
            message: string;
            path: string;
            userMessage: string;
        }[];
        warnings: {
            code: string;
            details: string;
            message: string;
            path: string;
            userMessage: string;
        }[];
        validatedAt: Date;
    };
    language: string;
}

export interface IOutput {
    additionalServices: {
        id: string;
    };
    afterSalesServices: {
        impliedWarranty: {
            id: string;
        };
        returnPolicy: {
            id: string;
        };
        warranty: {
            id: string;
        };
    };
    attachments: {
        id: string;
    }[];
    category: {
        id: string;
    };
    compatibilityList: {
        type: string;
    };
    contact: {
        id: string;
    };
    createdAt: Date;
    customParameters: {
        name: string;
        values: string[];
    }[];
    delivery: {
        additionalInfo: string;
        handlingTime: string;
        shippingRates: {
            id: string;
        };
        shipmentDate: Date;
    };
    description: {
        sections: {
            items: {
                type: string;
            }[];
        }[];
    };
    discounts: {
        wholesalePriceList: {
            id: string;
        };
    };
    external: {
        id: string;
    };
    fundraisingCampaign: {
        id: string;
    };
    id: string;
    images: {
        url: string;
    }[];
    location: {
        city: string;
        countryCode: string;
        postCode: string;
        province: string;
    };
    name: string;
    parameters: {
        id: string;
        rangeValue: {
            from: string;
            to: string;
        };
        values: string[];
        valuesIds: string[];
    }[];
    payments: {
        invoice: string;
    };
    product: {
        id: string;
    };
    promotion: {
        bold: boolean;
        departmentPage: boolean;
        emphasized: boolean;
        emphasizedHighlightBoldPackage: boolean;
        highlight: boolean;
    };
    publication: {
        duration: string;
        endingAt: Date;
        startingAt: Date;
        status: string;
        endedBy: string;
        republish: boolean;
    };
    sellingMode: {
        format: string;
        price: {
            amount: string;
            currency: string;
        };
        minimalPrice: {
            amount: string;
            currency: string;
        };
        startingPrice: {
            amount: string;
            currency: string;
        };
        netPrice: {
            amount: string;
            currency: string;
        };
    };
    tax: {
        id: string;
        rate: string;
        subject: string;
        exemption: string;
        percentage: string;
    };
    sizeTable: {
        id: string;
    };
    stock: {
        available: number;
        unit: string;
    };
    tecdocSpecification: {
        id: string;
        items: {
            name: string;
            values: string[];
        }[];
    };
    b2b: {
        buyableOnlyByBusiness: boolean;
    };
    messageToSellerSettings: {
        mode: string;
    };
    updatedAt: Date;
    validation: {
        errors: {
            code: string;
            details: string;
            message: string;
            path: string;
            userMessage: string;
        }[];
        warnings: {
            code: string;
            details: string;
            message: string;
            path: string;
            userMessage: string;
        }[];
        validatedAt: Date;
    };
    language: string;
}
