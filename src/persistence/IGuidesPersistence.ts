import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { AnyValueMap } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { GuidePageV1 } from '../data/version1/GuidePageV1';
import { GuideV1 } from '../data/version1/GuideV1';

export interface IGuidesPersistence
    extends IGetter<GuideV1, string>, IWriter<GuideV1, string>  {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GuideV1>) => void): void;

    getOneRandom(correlationId: string, filter: FilterParams, 
        callback: (err: any, item: GuideV1) => void): void;

    getOneById(correlationId: string, id: string,
        callback: (err: any, item: GuideV1) => void): void;

    create(correlationId: string, item: GuideV1,
        callback: (err: any, item: GuideV1) => void): void;

    update(correlationId: string, item: GuideV1,
        callback: (err: any, item: GuideV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: GuideV1) => void): void;
}

