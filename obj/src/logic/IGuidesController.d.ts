import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GuideV1 } from '../data/version1/GuideV1';
export interface IGuidesController {
    getGuides(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<GuideV1>) => void): void;
    getRandomGuide(correlationId: string, filter: FilterParams, callback: (err: any, guide: GuideV1) => void): void;
    getGuideById(correlationId: string, guideId: string, callback: (err: any, guide: GuideV1) => void): void;
    createGuide(correlationId: string, guide: GuideV1, callback: (err: any, guide: GuideV1) => void): void;
    updateGuide(correlationId: string, guide: GuideV1, callback: (err: any, guide: GuideV1) => void): void;
    deleteGuideById(correlationId: string, guideId: string, callback: (err: any, guide: GuideV1) => void): void;
}
