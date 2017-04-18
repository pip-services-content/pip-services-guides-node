import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesPersistence } from './IGuidesPersistence';
export declare class GuidesMemoryPersistence extends IdentifiableMemoryPersistence<GuideV1, string> implements IGuidesPersistence {
    constructor();
    private contains(array1, array2);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<GuideV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: GuideV1) => void): void;
}
