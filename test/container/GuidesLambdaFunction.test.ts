let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { MultiString } from 'pip-services-commons-node';

import { GuidePageV1 } from '../../src/data/version1/GuidePageV1';
import { GuideV1 } from '../../src/data/version1/GuideV1';
import { GuidesMemoryPersistence } from '../../src/persistence/GuidesMemoryPersistence';
import { GuidesController } from '../../src/logic/GuidesController';
import { GuidesLambdaFunction } from '../../src/container/GuidesLambdaFunction';

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

suite('GuidesLambdaFunction', ()=> {
    let lambda: GuidesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-guides:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-guides:controller:default:default:1.0'
        );

        lambda = new GuidesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let guide1, guide2;

        async.series([
        // Create one guide
            (callback) => {
                lambda.act(
                    {
                        role: 'guides',
                        cmd: 'create_guide',
                        guide: GUIDE1
                    },
                    (err, guide) => {
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
                lambda.act(
                    {
                        role: 'guides',
                        cmd: 'create_guide',
                        guide: GUIDE2
                    },
                    (err, guide) => {
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
                lambda.act(
                    {
                        role: 'guides',
                        cmd: 'get_guides' 
                    },
                    (err, page) => {
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

                lambda.act(
                    {
                        role: 'guides',
                        cmd: 'update_guide',
                        guide: guide1
                    },
                    (err, guide) => {
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
                lambda.act(
                    {
                        role: 'guides',
                        cmd: 'delete_guide_by_id',
                        guide_id: guide1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete guide
            (callback) => {
                lambda.act(
                    {
                        role: 'guides',
                        cmd: 'get_guide_by_id',
                        guide_id: guide1.id
                    },
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isNull(guide || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});