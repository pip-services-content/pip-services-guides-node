import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { GuidesMongoDbPersistence } from '../persistence/GuidesMongoDbPersistence';
import { GuidesFilePersistence } from '../persistence/GuidesFilePersistence';
import { GuidesMemoryPersistence } from '../persistence/GuidesMemoryPersistence';
import { GuidesController } from '../logic/GuidesController';
import { GuidesHttpServiceV1 } from '../services/version1/GuidesHttpServiceV1';
import { GuidesSenecaServiceV1 } from '../services/version1/GuidesSenecaServiceV1'; 

export class GuidesFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-guides", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-guides", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-guides", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-guides", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-guides", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-guides", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-guides", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(GuidesFactory.MemoryPersistenceDescriptor, GuidesMemoryPersistence);
		this.registerAsType(GuidesFactory.FilePersistenceDescriptor, GuidesFilePersistence);
		this.registerAsType(GuidesFactory.MongoDbPersistenceDescriptor, GuidesMongoDbPersistence);
		this.registerAsType(GuidesFactory.ControllerDescriptor, GuidesController);
		this.registerAsType(GuidesFactory.SenecaServiceDescriptor, GuidesSenecaServiceV1);
		this.registerAsType(GuidesFactory.HttpServiceDescriptor, GuidesHttpServiceV1);
	}
	
}
