"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const GuidesCommandSet_1 = require("./GuidesCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class GuidesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(GuidesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new GuidesCommandSet_1.GuidesCommandSet(this);
        return this._commandSet;
    }
    getGuides(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRandomGuide(correlationId, filter, callback) {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }
    getGuideById(correlationId, guideId, callback) {
        this._persistence.getOneById(correlationId, guideId, callback);
    }
    createGuide(correlationId, guide, callback) {
        let newGuide = null;
        guide.create_time = new Date();
        guide.all_tags = pip_services3_commons_node_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
        async.series([
            (callback) => {
                this._persistence.create(correlationId, guide, (err, data) => {
                    newGuide = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newGuide, callback);
            }
        ], (err) => {
            callback(err, newGuide);
        });
    }
    updateGuide(correlationId, guide, callback) {
        let oldGuide = null;
        let newGuide = null;
        guide.all_tags = pip_services3_commons_node_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, guide.id, (err, data) => {
                    oldGuide = data;
                    if (err == null && data == null) {
                        err = new pip_services3_commons_node_4.NotFoundException(correlationId, 'GUIDE_NOT_FOUND', 'Guide ' + guide.id + ' was not found').withDetails('guide_id', guide.id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, guide, (err, data) => {
                    newGuide = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.updateAttachments(correlationId, oldGuide, newGuide, callback);
            }
        ], (err) => {
            callback(err, newGuide);
        });
    }
    deleteGuideById(correlationId, guideId, callback) {
        let oldGuide = null;
        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, guideId, (err, data) => {
                    oldGuide = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldGuide, callback);
            }
        ], (err) => {
            callback(err, oldGuide);
        });
    }
}
exports.GuidesController = GuidesController;
GuidesController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-guides:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
//# sourceMappingURL=GuidesController.js.map