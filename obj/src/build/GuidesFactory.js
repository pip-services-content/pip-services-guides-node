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
class GuidesFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(GuidesFactory.MemoryPersistenceDescriptor, GuidesMemoryPersistence_1.GuidesMemoryPersistence);
        this.registerAsType(GuidesFactory.FilePersistenceDescriptor, GuidesFilePersistence_1.GuidesFilePersistence);
        this.registerAsType(GuidesFactory.MongoDbPersistenceDescriptor, GuidesMongoDbPersistence_1.GuidesMongoDbPersistence);
        this.registerAsType(GuidesFactory.ControllerDescriptor, GuidesController_1.GuidesController);
        this.registerAsType(GuidesFactory.SenecaServiceDescriptor, GuidesSenecaServiceV1_1.GuidesSenecaServiceV1);
        this.registerAsType(GuidesFactory.HttpServiceDescriptor, GuidesHttpServiceV1_1.GuidesHttpServiceV1);
    }
}
GuidesFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "factory", "default", "default", "1.0");
GuidesFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "persistence", "memory", "*", "1.0");
GuidesFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "persistence", "file", "*", "1.0");
GuidesFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "persistence", "mongodb", "*", "1.0");
GuidesFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "controller", "default", "*", "1.0");
GuidesFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "service", "seneca", "*", "1.0");
GuidesFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-guides", "service", "http", "*", "1.0");
exports.GuidesFactory = GuidesFactory;
//# sourceMappingURL=GuidesFactory.js.map