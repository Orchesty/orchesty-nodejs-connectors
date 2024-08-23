/* eslint-disable */
export interface AuthenticaProduct {
    id: number;
    name: string;
    declarationName: string;
    description?: string;
    note?: string;
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
    hsCode?: string;
    fdaCode?: string;
    inspectionMethod?: string;
    countryOfOrigin?: string;
    hasLot: boolean;
    hasImei: boolean;
    hasLotExpiration: boolean;
    skus: string[];
    barcodes: string[];
}
