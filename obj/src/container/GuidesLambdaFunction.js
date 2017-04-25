"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const GuidesServiceFactory_1 = require("../build/GuidesServiceFactory");
class GuidesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("guides", "System guides function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-guides', 'controller', 'default', '*', '*'));
        this._factories.add(new GuidesServiceFactory_1.GuidesServiceFactory());
    }
}
exports.GuidesLambdaFunction = GuidesLambdaFunction;
exports.handler = new GuidesLambdaFunction().getHandler();
//# sourceMappingURL=GuidesLambdaFunction.js.map