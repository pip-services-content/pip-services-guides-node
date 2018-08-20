let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { MultiString } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';

import { GuideV1 } from '../data/version1/GuideV1';
import { GuidePageV1 } from '../data/version1/GuidePageV1';
import { IGuidesPersistence } from './IGuidesPersistence';

export class GuidesMemoryPersistence 
    extends IdentifiableMemoryPersistence<GuideV1, string> 
    implements IGuidesPersistence {

    constructor() {
        super();
    }

    private contains(array1: string[], array2: string[]): boolean {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let app = filter.getAsNullableString('app');
        let name = filter.getAsNullableString('name');
        let status = filter.getAsNullableString('status');
        let tagsString = filter.get('tags');
        let tags = tagsString != null ? TagsProcessor.compressTags([tagsString]) : null;

        return (item: GuideV1) => {
            if (id != null && id != item.id)
                return false;
            if (type != null && type != item.type)
                return false;
            if (app != null && app != item.app)
                return false;
            if (name != null && name != item.name)
                return false;
            if (status != null && status != item.status)
                return false;
            if (tags != null && !this.contains(item.all_tags, tags))
                return false;
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GuideV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneRandom(correlationId: string, filter: FilterParams,
        callback: (err: any, item: GuideV1) => void): void {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }

}
