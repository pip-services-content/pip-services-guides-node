let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { IGuidesPersistence } from '../../src/persistence/IGuidesPersistence';
import { GuideV1 } from '../../src/data/version1/GuideV1';
import { GuidePageV1 } from '../../src/data/version1/GuidePageV1';

let GUIDE1 = <GuideV1>{
    id: '1',
    type: 'introduction',
    app: 'Test App 1',
    version: null,
    status: 'new'
};
let GUIDE2 = <GuideV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    type: 'new release',
    app: 'Test App 1',
    version: '1.0',
    status: 'new'
};
let GUIDE3 = <GuideV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    type: 'new release',
    app: 'Test App 2',
    version: '1.1',
    status: 'translating'
};

export class GuidesPersistenceFixture {
    private _persistence: IGuidesPersistence;
    
    constructor(persistence: IGuidesPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createGuides(done) {
        async.series([
        // Create one guide
            (callback) => {
                this._persistence.create(
                    null,
                    GUIDE1,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.status, 'new');
                        assert.equal(guide.type, GUIDE1.type);

                        callback();
                    }
                );
            },
        // Create another guide
            (callback) => {
                this._persistence.create(
                    null,
                    GUIDE2,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.status, 'new');
                        assert.equal(guide.type, GUIDE2.type);

                        callback();
                    }
                );
            },
        // Create yet another guide
            (callback) => {
                this._persistence.create(
                    null,
                    GUIDE3,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.status, GUIDE3.status);
                        assert.equal(guide.type, GUIDE3.type);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let guide1: GuideV1;

        async.series([
        // Create items
            (callback) => {
                this.createGuides(callback);
            },
        // Get all guides
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        guide1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the guide
            (callback) => {
                guide1.app = 'New App 1';

                this._persistence.update(
                    null,
                    guide1,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.app, 'New App 1');
                        assert.equal(guide.type, guide1.type);

                        callback();
                    }
                );
            },
        // Delete guide
            (callback) => {
                this._persistence.deleteById(
                    null,
                    guide1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete guide
            (callback) => {
                this._persistence.getOneById(
                    null,
                    guide1.id,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isNull(guide || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create guides
            (callback) => {
                this.createGuides(callback);
            },
        // Get guides filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1']
                    }),
                    new PagingParams(),
                    (err, guides) => {
                        assert.isNull(err);
                        
                        assert.isObject(guides);
                        assert.lengthOf(guides.data, 2);

                        callback();
                    }
                );
            },
        // Get guides filtered by status
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        type: GUIDE3.type,
                        app: GUIDE3.app,
                        version: GUIDE3.version
                    }),
                    new PagingParams(),
                    (err, guides) => {
                        assert.isNull(err);
                        
                        assert.isObject(guides);
                        assert.lengthOf(guides.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

    public testGetRandom(done) {
        async.series([
        // Create guides
            (callback) => {
                this.createGuides(callback);
            },
        // Get random guide filtered by tags
            (callback) => {
                this._persistence.getOneRandom(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1'],
                        status: 'new'
                    }),
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(GUIDE2.id, guide.id);

                        callback();
                    }
                );
            }
        ], done);
    }
}
