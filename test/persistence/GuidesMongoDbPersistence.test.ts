import { YamlConfigReader } from 'pip-services-commons-node';

import { GuidesMongoDbPersistence } from '../../src/persistence/GuidesMongoDbPersistence';
import { GuidesPersistenceFixture } from './GuidesPersistenceFixture';

suite('GuidesMongoDbPersistence', ()=> {
    let persistence: GuidesMongoDbPersistence;
    let fixture: GuidesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new GuidesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new GuidesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });
    
});