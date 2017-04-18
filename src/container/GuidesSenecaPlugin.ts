import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { GuidesMemoryPersistence } from '../persistence/GuidesMemoryPersistence';
import { GuidesFilePersistence } from '../persistence/GuidesFilePersistence';
import { GuidesMongoDbPersistence } from '../persistence/GuidesMongoDbPersistence';
import { GuidesController } from '../logic/GuidesController';
import { GuidesSenecaServiceV1 } from '../services/version1/GuidesSenecaServiceV1';

export class GuidesSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-guides', seneca, GuidesSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new GuidesController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new GuidesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new GuidesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new GuidesMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new GuidesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-guides', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-guides', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-guides', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new GuidesSenecaPlugin(seneca, options);
    return { name: plugin.name };
}