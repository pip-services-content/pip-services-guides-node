"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class GuidesHttpServiceV1 extends pip_services_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/guides');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}
exports.GuidesHttpServiceV1 = GuidesHttpServiceV1;
//# sourceMappingURL=GuidesHttpServiceV1.js.map