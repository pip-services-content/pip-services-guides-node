import { MultiString } from 'pip-services-commons-node';

export class GuidePageV1 {

    public constructor(title: MultiString, content?: MultiString,
        moreUrl?: string, color?: string, picId?: string) {
        this.title = title;
        this.content = content;
        this.more_url = moreUrl;
        this.color = color;
        this.pic_id = picId;
    }

    public title: MultiString;
    public content?: MultiString;
    public more_url?: string;
    public color?: string;
    public pic_id?: string;
}
