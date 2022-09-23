import 'reflect-metadata';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const EXCLUDED_FOLDERS = ['Common'];

interface IFileMetadata {
    name?: string;
    publicName?: string;
    description?: IDescription[];
    logo?: string;
    categories?: string[];
}

interface IDescription {
  lang: string;
  text: string;
}

// TODO rich prepsat na getMetadata
function getFileMetadata(source: string, folderName: string): IFileMetadata[] {
    const filesMetadata: IFileMetadata[] = [];

    readdirSync(`${source}/${folderName}`, { withFileTypes: true })
        .forEach((item) => {
            if (item.name.endsWith('Application.ts') && !(/A[A-Z].*/).exec(item.name)) {
                const path = `./${source}/${folderName}/${item.name}`;
                // eslint-disable-next-line
                const classDefault = require(path).default;
                const reflectedClass = Reflect.construct(classDefault, []);
                const fileMetadata: IFileMetadata = {};
                fileMetadata.name = reflectedClass.getName();
                fileMetadata.publicName = reflectedClass.getPublicName();
                fileMetadata.description = [];
                fileMetadata.description.push({
                    lang: 'en',
                    text: reflectedClass.getDescription(),
                });
                fileMetadata.logo = reflectedClass.getLogo();
                fileMetadata.categories = [];
                filesMetadata.push(fileMetadata);
            }
        });

    return filesMetadata;
}

function getDirectories(source: string, exclude: string[]): IFileMetadata[] {
    return readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && !exclude.includes(dirent.name))
        .flatMap((dirent) => getFileMetadata(source, dirent.name));
}

function generateApplicationMetaToJson(): void {
    const directories = getDirectories('lib', EXCLUDED_FOLDERS);
    let originalJsonFile: IFileMetadata[];
    try {
        originalJsonFile = JSON.parse(readFileSync('appMetadata.json').toString());
    } catch (e) {
        originalJsonFile = [];
    }

    const newJsonFile: IFileMetadata[] = [];
    directories.forEach((item) => {
        const originalApp = originalJsonFile.find((app) => app.name === item.name)
        if (originalApp) {
          const newApp: IFileMetadata = {
            ...originalApp,
            publicName: item.publicName,
            logo: item.logo,
          }
          newApp.description = newApp?.description?.map((desc) => {
            if (desc.lang === 'en') {
              return item?.description?.[0] ?? {} as IDescription;
            }
            return desc;
          }) ?? [];
          if (!newApp.description.find((d) => d.lang === 'en')) {
            newApp.description.push(item?.description?.[0] ?? {} as IDescription);
          }
          newJsonFile.push(newApp);
          return;
        }

        newJsonFile.push(item);
        return;
    });

    const json = JSON.stringify(newJsonFile, null, 4);
    writeFileSync('appMetadata.json', json);
}

generateApplicationMetaToJson();

process.exit();
