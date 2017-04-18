import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { GuidePageV1 } from '../data/version1/GuidePageV1';
import { GuideV1 } from '../data/version1/GuideV1';

export interface IGuidesBusinessLogic {
    getGuides(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GuideV1>) => void): void;

    getRandomGuide(correlationId: string, filter: FilterParams,
        callback: (err: any, guide: GuideV1) => void): void;

    getGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void;

    createGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void;

    updateGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void;

    deleteGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void;
}
