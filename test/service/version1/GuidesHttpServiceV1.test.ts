let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { GuidePageV1 } from '../../../src/data/version1/GuidePageV1';
import { GuideV1 } from '../../../src/data/version1/GuideV1';
import { GuidesMemoryPersistence } from '../../../src/persistence/GuidesMemoryPersistence';
import { GuidesController } from '../../../src/logic/GuidesController';
import { GuidesHttpServiceV1 } from '../../../src/services/version1/GuidesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let GUIDE1 = <GuideV1>{
    id: '1',
    name: 'Name1',
    type: 'introduction',
    app: 'Test App 1',
    max_ver: null,
    min_ver: null,
    status: 'new'
};
let GUIDE2 = <GuideV1>{
    id: '2',
    name: 'Name2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    type: 'new release',
    app: 'Test App 1',
    max_ver: 1,
    min_ver: 2,
    status: 'new'
};

suite('GuidesHttpServiceV1', ()=> {
    let service: GuidesHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new GuidesMemoryPersistence();
        let controller = new GuidesController();

        service = new GuidesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-guides', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-guides', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-guides', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let guide1, guide2;

        async.series([
        // Create one guide
            (callback) => {
                rest.post('/guides/create_guide',
                    {
                        guide: GUIDE1
                    },
                    (err, req, res, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.type, GUIDE1.type);
                        assert.equal(guide.app, GUIDE1.app);

                        guide1 = guide;

                        callback();
                    }
                );
            },
        // Create another guide
            (callback) => {
                rest.post('/guides/create_guide',
                    {
                        guide: GUIDE2
                    },
                    (err, req, res, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.type, GUIDE2.type);
                        assert.equal(guide.app, GUIDE2.app);

                        guide2 = guide;

                        callback();
                    }
                );
            },
        // Get all guides
            (callback) => {
                rest.post('/guides/get_guides',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the guide
            (callback) => {
                guide1.app = 'New App 1';

                rest.post('/guides/update_guide',
                    {
                        guide: guide1
                    },
                    (err, req, res, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.app, 'New App 1');
                        assert.equal(guide.type, GUIDE1.type);

                        guide1 = guide;

                        callback();
                    }
                );
            },
        // Delete guide
            (callback) => {
                rest.post('/guides/delete_guide_by_id',
                    {
                        guide_id: guide1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete guide
            (callback) => {
                rest.post('/guides/get_guide_by_id',
                    {
                        guide_id: guide1.id
                    },
                    (err, req, res, guide) => {
                        assert.isNull(err);
                        
                        //assert.isNull(guide || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});