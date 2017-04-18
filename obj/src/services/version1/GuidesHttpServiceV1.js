"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class GuidesHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('guides');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}
exports.GuidesHttpServiceV1 = GuidesHttpServiceV1;
//# sourceMappingURL=GuidesHttpServiceV1.js.map