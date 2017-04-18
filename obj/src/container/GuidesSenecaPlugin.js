"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const GuidesMemoryPersistence_1 = require("../persistence/GuidesMemoryPersistence");
const GuidesFilePersistence_1 = require("../persistence/GuidesFilePersistence");
const GuidesMongoDbPersistence_1 = require("../persistence/GuidesMongoDbPersistence");
const GuidesController_1 = require("../logic/GuidesController");
const GuidesSenecaServiceV1_1 = require("../services/version1/GuidesSenecaServiceV1");
class GuidesSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-guides', seneca, GuidesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new GuidesController_1.GuidesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new GuidesMongoDbPersistence_1.GuidesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new GuidesFilePersistence_1.GuidesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new GuidesMemoryPersistence_1.GuidesMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new GuidesSenecaServiceV1_1.GuidesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-guides', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-guides', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-guides', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.GuidesSenecaPlugin = GuidesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new GuidesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=GuidesSenecaPlugin.js.map