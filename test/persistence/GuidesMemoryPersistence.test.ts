import { GuidesMemoryPersistence } from '../../src/persistence/GuidesMemoryPersistence';
import { GuidesPersistenceFixture } from './GuidesPersistenceFixture';

suite('GuidesMemoryPersistence', ()=> {
    let persistence: GuidesMemoryPersistence;
    let fixture: GuidesPersistenceFixture;
    
    setup((done) => {
        persistence = new GuidesMemoryPersistence();
        fixture = new GuidesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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