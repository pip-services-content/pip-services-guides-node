"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const GuidesServiceFactory_1 = require("../build/GuidesServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class GuidesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory_1.GuidesServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.GuidesProcess = GuidesProcess;
//# sourceMappingURL=GuidesProcess.js.map