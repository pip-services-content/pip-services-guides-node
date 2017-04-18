import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class GuidePageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('title', TypeCode.Map);
        this.withOptionalProperty('content', TypeCode.Map);
        this.withOptionalProperty('more_url', TypeCode.String);
        this.withOptionalProperty('color', TypeCode.String);
        this.withOptionalProperty('pic_id', TypeCode.String);
    }
}
