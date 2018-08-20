"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class GuidesSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('guides');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}
exports.GuidesSenecaServiceV1 = GuidesSenecaServiceV1;
//# sourceMappingURL=GuidesSenecaServiceV1.js.map