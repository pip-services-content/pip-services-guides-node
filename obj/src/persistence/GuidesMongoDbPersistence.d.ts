import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesPersistence } from './IGuidesPersistence';
export declare class GuidesMongoDbPersistence extends IdentifiableMongoDbPersistence<GuideV1, string> implements IGuidesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: GuideV1) => void): void;
}
