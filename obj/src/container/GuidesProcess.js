"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const GuidesFactory_1 = require("../build/GuidesFactory");
class GuidesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesFactory_1.GuidesFactory);
    }
}
exports.GuidesProcess = GuidesProcess;
//# sourceMappingURL=GuidesProcess.js.map