"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const GuidesFactory_1 = require("../build/GuidesFactory");
class GuidesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("guides", "System guides function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-guides', 'controller', 'default', '*', '*'));
        this._factories.add(new GuidesFactory_1.GuidesFactory());
    }
}
exports.GuidesLambdaFunction = GuidesLambdaFunction;
exports.handler = new GuidesLambdaFunction().getHandler();
//# sourceMappingURL=GuidesLambdaFunction.js.map