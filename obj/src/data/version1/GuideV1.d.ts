import { IStringIdentifiable } from 'pip-services-commons-node';
import { GuidePageV1 } from './GuidePageV1';
export declare class GuideV1 implements IStringIdentifiable {
    constructor(id: string, type: string, app?: string, version?: string, pages?: GuidePageV1[]);
    id: string;
    type: string;
    app?: string;
    version?: string;
    create_time: Date;
    pages: GuidePageV1[];
    tags?: string[];
    all_tags?: string[];
    status?: string;
    custom_hdr?: any;
    custom_dat?: any;
}
