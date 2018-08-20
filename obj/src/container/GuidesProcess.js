"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const GuidesServiceFactory_1 = require("../build/GuidesServiceFactory");
class GuidesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory_1.GuidesServiceFactory);
    }
}
exports.GuidesProcess = GuidesProcess;
//# sourceMappingURL=GuidesProcess.js.map