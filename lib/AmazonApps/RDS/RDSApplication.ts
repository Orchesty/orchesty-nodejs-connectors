import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { RDSClient } from '@aws-sdk/client-rds';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AAwsApplication, {
  CREDENTIALS, KEY, LATEST, REGION, REGIONS, SECRET,
} from '../AAwsApplication';

export default class RDSApplication extends AAwsApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the cloud. ';

  public getName = (): string => 'rds';

  public getPublicName = (): string => 'Amazon RDS';

  public getSettingsForm = (): Form => new Form()
    .addField((new Field(FieldType.TEXT, KEY, 'Key', undefined, true)))
    .addField((new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true)))
    .addField((new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true)).setChoices(REGIONS));

  public getRDSClient = (applicationInstall: ApplicationInstall): RDSClient => {
    const settings = applicationInstall.getSettings()[FORM];

    return new RDSClient({
      [CREDENTIALS]: {
        accessKeyId: settings[KEY],
        secretAccessKey: settings[SECRET],
      },
      apiVersion: LATEST,
      region: settings[REGION],
    });
  };

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARYAAAC1CAMAAACtbCCJAAAAt1BMVEX///8jdLlal8scXpYUQ2snd7pMiL09hMIhYplIi8U/dKEtWYAacbh8q9Tx9vsIPmhvjaXM3+8PWZPW5fJdmcySutxkns/i6/KpyOOCsNe20Ofr8/n2+vxUk8l0p9OixOEhT3WltsWIq8gqaZ2kvtNYiLGwxtlmkbfE1eRzmr2+1upBeajU4/FLgKxvl7o4cKKQqb6YrL25x9I4YYNGaonO2OBbepZ/mK1sh6DZ4ecaSnGWssuEpcQ8YiizAAAEKElEQVR4nO3d6VbiQBAF4KwjSEhkSUJIQ0AUWRzZRcT3f67peGQmbDKjSXdlzr1PYH8nqVvBH60o2ce/7RV+mOoXc6XV3RoT8GeKjX83rurfYtE0L/rPYPy7e53nmyya1m7UZB8lvdj9h4KeCoumlZu+7OOkEzYY9qp6WiytetAMZR8phWyGPX2XFFhimPIo5yOGbbaTQjVdlnj2BpU8w/D60ZNJi0Xjbf1oyz7dFxP2f1arGbHwVymfbc3rR99HSZWFw3jRo+xD/mvY4Kl3iJIyS7zGRLlaY9jjcHJkkgGLVm838tPW/u1JlAxYYphmPmYvr5/CaZUsWDhMMKL/xPj9+zMmWbHEMBXaTwzjXz/HkzZrFt7WLuX9bvBwon4EsMRt7VZkn/50WOXpzKQVwMLjuRTbOtxeQsmYhZdSRG72htPrT98fASyaVnSJjV57Xbq+qJI9i+mSmrz29JUEi2o2KLnMOg4JFtO6asq2+BOuYtBgUa0imaLudgyDCotqtYi4zEsOIRbVqpPYX+aLWIUOi6q2CfzPZL58V6HEopalr3WrpWGQYzEDyTW9ejYIsqiS17rNbxVaLHytk6jivxhEWWSudeGNQZWFr3UjSSr22qHLIm2tY2vDIMyiqlLWOjbtEGeRsdax2b4KRRazLXyt65Yc8izi17ru4kCFJIvotW5+pEKTxRL6a93qWIUmi9C1jt0cqxBlUa2ysH8G2GABC1jAAhawgAUsYAELWMACFrCABSxgAQtYwAIWsIAFLGABC1jAAhawgAUsYAELWMACFrCABSxgAQtYwAIWsIAFLGABC1jAAhawgAUsYAELWMACFrCABSxgAQtYwAIWsIAFLGABC1jAAhawgAUsYAELWMACFrCABSxgAQtYwAIWsIAFLGABC1jAAhawgAUsYAELWMACFrCABSxgocSizDu5uZzUFHnnfPfYhSaLGYm84vfw6nCyLIG4V+jdZf2aBxZP9PXh/joHLFpNsAp3eSHPUhwJV1GUzbNDm0XgDdnJrJYOYRbrqiFFJb5bnTCL6ootoUTmJbosgegSSqRbcmiyWG2JKgqbdWiySKjmZOzpK0WWYkWqiqKEu3WXEoukak7G//iVgRCL2RD5fXgmH2sdGRbLlFfNyWyWpFjUsswSSuR9rSPD0vZle+wyXzhUWCzJ1bwXvtbRYLGkV3MyrNshwUKhmpNhswUFFjOSDXGQcHpdlc7SolHNyYTbsWyWdkROhafyNrnwwGTK4kWEOigZNhjqn8Jkx9KqRzUCG/+Z2IOHggwWzyWMEifs35+HyYjFCyoUh8p+7O24cOZVyoKlVQ9GtJ+UXTa349MzJn2WlhY0iXwZXg4bvE3EsJQbZD4M/ya8lHrZs7QbRDv5fHgpHb1I6bJ4kZ+PobKfsH+496bJUnezR/kFa2FCqqMmMDcAAAAASUVORK5CYII=';
}
