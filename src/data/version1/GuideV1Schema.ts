import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { GuidePageV1Schema } from './GuidePageV1Schema';

export class GuideV1Schema extends ObjectSchema {
    public constructor() {
        super();
    
        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('type', TypeCode.String);
        this.withOptionalProperty('app', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);

        this.withOptionalProperty('min_ver', TypeCode.Integer);
        this.withOptionalProperty('max_ver', TypeCode.Integer);

        /* Generic request properties */
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);

        /* Content */
        this.withOptionalProperty('pages', new ArraySchema(new GuidePageV1Schema()));

        /* Search */
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));

        /* Status */
        this.withOptionalProperty('status', TypeCode.String);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
