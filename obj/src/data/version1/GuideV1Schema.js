"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const GuidePageV1Schema_1 = require("./GuidePageV1Schema");
class GuideV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('type', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('app', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('name', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('min_ver', pip_services_commons_node_3.TypeCode.Integer);
        this.withOptionalProperty('max_ver', pip_services_commons_node_3.TypeCode.Integer);
        /* Generic request properties */
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        /* Content */
        this.withOptionalProperty('pages', new pip_services_commons_node_2.ArraySchema(new GuidePageV1Schema_1.GuidePageV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        /* Status */
        this.withOptionalProperty('status', pip_services_commons_node_3.TypeCode.String);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.GuideV1Schema = GuideV1Schema;
//# sourceMappingURL=GuideV1Schema.js.map