import { XMLBuilder, XMLParser } from 'fast-xml-parser';

export const windowsTextDecoder = new TextDecoder('windows-1250');
export const xmlParser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    removeNSPrefix: true,
    attributeNamePrefix: '',
});
export const xmlBuilder = new XMLBuilder({ attributeNamePrefix: '@_', ignoreAttributes: false });

export function convertPohodaResponseToUtf8(bufferedText: Buffer): string {
    return windowsTextDecoder.decode(bufferedText);
}
