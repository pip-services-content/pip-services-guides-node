import { MultiString } from 'pip-services-commons-node';
export declare class GuidePageV1 {
    constructor(title: MultiString, content?: MultiString, moreUrl?: string, color?: string, picId?: string);
    title: MultiString;
    content?: MultiString;
    more_url?: string;
    color?: string;
    pic_id?: string;
}
