"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const GuidesMongoDbPersistence_1 = require("../persistence/GuidesMongoDbPersistence");
const GuidesFilePersistence_1 = require("../persistence/GuidesFilePersistence");
const GuidesMemoryPersistence_1 = require("../persistence/GuidesMemoryPersistence");
const GuidesController_1 = require("../logic/GuidesController");
const GuidesHttpServiceV1_1 = require("../services/version1/GuidesHttpServiceV1");
const GuidesSenecaServiceV1_1 = require("../services/version1/GuidesSenecaServiceV1");
class GuidesServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(GuidesServiceFactory.MemoryPersistenceDescriptor, GuidesMemoryPersistence_1.GuidesMemoryPersistence);
        this.registerAsType(GuidesServiceFactory.FilePersistenceDescriptor, GuidesFilePersistence_1.GuidesFilePersistence);
        this.registerAsType(GuidesServiceFactory.MongoDbPersistenceDescriptor, GuidesMongoDbPersistence_1.GuidesMongoDbPersistence);
        this.registerAsType(GuidesServiceFactory.ControllerDescriptor, GuidesController_1.GuidesController);
        this.registerAsType(GuidesServiceFactory.SenecaServiceDescriptor, GuidesSenecaServiceV1_1.GuidesSenecaServiceV1);
        this.registerAsType(GuidesServiceFactory.HttpServiceDescriptor, GuidesHttpServiceV1_1.GuidesHttpServiceV1);
    }
}
GuidesServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "factory", "default", "default", "1.0");
GuidesServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "persistence", "memory", "*", "1.0");
GuidesServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "persistence", "file", "*", "1.0");
GuidesServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "persistence", "mongodb", "*", "1.0");
GuidesServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "controller", "default", "*", "1.0");
GuidesServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "service", "seneca", "*", "1.0");
GuidesServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "service", "http", "*", "1.0");
exports.GuidesServiceFactory = GuidesServiceFactory;
//# sourceMappingURL=GuidesServiceFactory.js.map