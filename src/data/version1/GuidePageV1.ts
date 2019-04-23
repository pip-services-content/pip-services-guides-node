import { MultiString } from 'pip-services3-commons-node';

export class GuidePageV1 {

    public constructor(title: MultiString, content?: MultiString,
        moreUrl?: string, color?: string, picId?: string, picUri?: string) {
        this.title = title;
        this.content = content;
        this.more_url = moreUrl;
        this.color = color;
        this.pic_id = picId;
        this.pic_uri = picUri;
    }

    public title: MultiString;
    public content?: MultiString;
    public more_url?: string;
    public color?: string;
    public pic_id?: string;
    public pic_uri?: string;
}
