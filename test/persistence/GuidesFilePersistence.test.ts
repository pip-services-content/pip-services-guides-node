import { ConfigParams } from 'pip-services3-commons-node';

import { GuidesFilePersistence } from '../../src/persistence/GuidesFilePersistence';
import { GuidesPersistenceFixture } from './GuidesPersistenceFixture';

suite('GuidesFilePersistence', ()=> {
    let persistence: GuidesFilePersistence;
    let fixture: GuidesPersistenceFixture;
    
    setup((done) => {
        persistence = new GuidesFilePersistence('./data/Guides.test.json');

        fixture = new GuidesPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
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