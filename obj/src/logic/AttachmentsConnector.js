"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(guide) {
        let ids = [];
        _.each(guide.pages, (page) => {
            if (page.pic_id)
                ids.push(page.pic_id);
        });
        return ids;
    }
    addAttachments(correlationId, guide, callback) {
        if (this._attachmentsClient == null || guide == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(guide);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(guide.id, 'guide');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
    updateAttachments(correlationId, oldGuide, newGuide, callback) {
        if (this._attachmentsClient == null || oldGuide == null || newGuide == null) {
            callback(null);
            return;
        }
        let oldIds = this.extractAttachmentIds(oldGuide);
        let newIds = this.extractAttachmentIds(newGuide);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(newGuide.id, 'guide');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, guide, callback) {
        if (this._attachmentsClient == null || guide == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(guide);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(guide.id, 'guide');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map