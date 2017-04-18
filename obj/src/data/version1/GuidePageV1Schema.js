"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class GuidePageV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('title', pip_services_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('content', pip_services_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('more_url', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('color', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('pic_id', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.GuidePageV1Schema = GuidePageV1Schema;
//# sourceMappingURL=GuidePageV1Schema.js.map