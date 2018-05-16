"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const GuidesServiceFactory_1 = require("../build/GuidesServiceFactory");
class GuidesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory_1.GuidesServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.GuidesProcess = GuidesProcess;
//# sourceMappingURL=GuidesProcess.js.map