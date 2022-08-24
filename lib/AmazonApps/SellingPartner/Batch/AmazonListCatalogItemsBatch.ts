import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'amazon-list-catalog-items-batch';

export default class AmazonListCatalogItemsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { marketplaceIds } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `catalog/v0/items?MarketplaceId=${marketplaceIds}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.payload.Items ?? []);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    marketplaceIds: string;
}

export interface IOutput {
    Identifiers: {
        MarketplaceASIN: {
            MarketplaceId: string;
            ASIN: string;
        };
        SKUIdentifier: {
            MarketplaceId: string;
            SellerId: string;
            SellerSKU: string;
        };
    };
    AttributeSets:
    {
        Actor: string[];
        Artist: string[];
        AspectRatio: string;
        AudienceRating: string;
        Author: string[];
        BackFinding: string;
        BandMaterialType: string;
        Binding: string;
        BlurayRegion: string;
        Brand: string;
        CeroAgeRating: string;
        ChainType: string;
        ClaspType: string;
        Color: string;
        CpuManufacturer: string;
        CpuSpeed: {
            value: number;
            Units: string;
        };
        CpuType: string;
        Creator:
        {
            value: string;
            Role: string;
        }[];
        Department: string;
        Director: string[];
        DisplaySize: {
            value: number;
            Units: string;
        };
        Edition: string;
        EpisodeSequence: string;
        EsrbAgeRating: string;
        Feature: string[];
        Flavor: string;
        Format: string[];
        GemType: string[];
        Genre: string;
        GolfClubFlex: string;
        GolfClubLoft: {
            value: number;
            Units: string;
        };
        HandOrientation: string;
        HardDiskInterface: string;
        HardDiskSize: {
            value: number;
            Units: string;
        };
        HardwarePlatform: string;
        HazardousMaterialType: string;
        ItemDimensions: {
            Height: {
                value: number;
                Units: string;
            };
            Length: {
                value: number;
                Units: string;
            };
            Width: {
                value: number;
                Units: string;
            };
            Weight: {
                value: number;
                Units: string;
            };
        };
        IsAdultProduct: boolean;
        IsAutographed: boolean;
        IsEligibleForTradeIn: boolean;
        IsMemorabilia: boolean;
        IssuesPerYear: string;
        ItemPartNumber: string;
        Label: string;
        Languages:
        {
            Name: string;
            Type: string;
            AudioFormat: string;
        }[];
        LegalDisclaimer: string;
        ListPrice: {
            Amount: number;
            CurrencyCode: string;
        };
        Manufacturer: string;
        ManufacturerMaximumAge: {
            value: number;
            Units: string;
        };
        ManufacturerMinimumAge: {
            value: number;
            Units: string;
        };
        ManufacturerPartsWarrantyDescription: string;
        MaterialType: string[];
        MaximumResolution: {
            value: number;
            Units: string;
        };
        MediaType: string[];
        MetalStamp: string;
        MetalType: string;
        Model: string;
        NumberOfDiscs: number;
        NumberOfIssues: number;
        NumberOfItems: number;
        NumberOfPages: number;
        NumberOfTracks: number;
        OperatingSystem: string[];
        OpticalZoom: {
            value: number;
            Units: string;
        };
        PackageDimensions: {
            Height: {
                value: number;
                Units: string;
            };
            Length: {
                value: number;
                Units: string;
            };
            Width: {
                value: number;
                Units: string;
            };
            Weight: {
                value: number;
                Units: string;
            };
        };
        PackageQuantity: number;
        PartNumber: string;
        PegiRating: string;
        Platform: string[];
        ProcessorCount: number;
        ProductGroup: string;
        ProductTypeName: string;
        ProductTypeSubcategory: string;
        PublicationDate: string;
        Publisher: string;
        RegionCode: string;
        ReleaseDate: string;
        RingSize: string;
        RunningTime: {
            value: number;
            Units: string;
        };
        ShaftMaterial: string;
        Scent: string;
        SeasonSequence: string;
        SeikodoProductCode: string;
        Size: string;
        SizePerPearl: string;
        SmallImage: {
            URL: string;
            Height: {
                value: number;
                Units: string;
            };
            Width: {
                value: number;
                Units: string;
            };
        };
        Studio: string;
        SubscriptionLength: {
            value: number;
            Units: string;
        };
        SystemMemorySize: {
            value: number;
            Units: string;
        };
        SystemMemoryType: string;
        TheatricalReleaseDate: string;
        Title: string;
        TotalDiamondWeight: {
            value: number;
            Units: string;
        };
        TotalGemWeight: {
            value: number;
            Units: string;
        };
        Warranty: string;
        WeeeTaxValue: {
            Amount: number;
            CurrencyCode: string;
        };
    }[];
    Relationships:
    {
        Identifiers: {
            MarketplaceASIN: {
                MarketplaceId: string;
                ASIN: string;
            };
            SKUIdentifier: {
                MarketplaceId: string;
                SellerId: string;
                SellerSKU: string;
            };
        };
        Color: string;
        Edition: string;
        Flavor: string;
        GemType: string[];
        GolfClubFlex: string;
        HandOrientation: string;
        HardwarePlatform: string;
        MaterialType: string[];
        MetalType: string;
        Model: string;
        OperatingSystem: string[];
        ProductTypeSubcategory: string;
        RingSize: string;
        ShaftMaterial: string;
        Scent: string;
        Size: string;
        SizePerPearl: string;
        GolfClubLoft: {
            value: number;
            Units: string;
        };
        TotalDiamondWeight: {
            value: number;
            Units: string;
        };
        TotalGemWeight: {
            value: number;
            Units: string;
        };
        PackageQuantity: number;
        ItemDimensions: {
            Height: {
                value: number;
                Units: string;
            };
            Length: {
                value: number;
                Units: string;
            };
            Width: {
                value: number;
                Units: string;
            };
            Weight: {
                value: number;
                Units: string;
            };
        };
    }[];
    SalesRankings:
    {
        ProductCategoryId: string;
        Rank: number;
    }[];

}

interface IResponse {
    payload: {
        Items: IOutput[];
    };
    errors:
    {
        code: string;
        message: string;
        details: string;
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
