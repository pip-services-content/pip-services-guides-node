import { IStringIdentifiable } from 'pip-services3-commons-node';
import { GuidePageV1 } from './GuidePageV1';
export declare class GuideV1 implements IStringIdentifiable {
    constructor(id: string, type: string, app?: string, name?: string, min_ver?: number, max_ver?: number, pages?: GuidePageV1[]);
    id: string;
    name: string;
    type: string;
    app?: string;
    min_ver?: number;
    max_ver?: number;
    create_time: Date;
    pages: GuidePageV1[];
    tags?: string[];
    all_tags?: string[];
    status?: string;
    custom_hdr?: any;
    custom_dat?: any;
}
