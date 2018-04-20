let _ = require('lodash');

import { ReferenceV1 } from 'pip-clients-attachments-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { GuideV1 } from '../data/version1/GuideV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(guide: GuideV1): string[] {
        let ids: string[] = [];

        _.each(guide.pages, (page) => {
            if (page.pic_id)
                ids.push(page.pic_id);
        });

        return ids;
    }

    public addAttachments(correlationId: string, guide: GuideV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || guide == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(guide);
        let reference = new ReferenceV1(guide.id, 'guide');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

    public updateAttachments(correlationId: string, oldGuide: GuideV1,
        newGuide: GuideV1, callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || oldGuide == null || newGuide == null) {
            callback(null);
            return;
        }

        let oldIds = this.extractAttachmentIds(oldGuide);
        let newIds = this.extractAttachmentIds(newGuide);
        let reference = new ReferenceV1(newGuide.id, 'guide');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        })
    }

    public removeAttachments(correlationId: string, guide: GuideV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || guide == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(guide);
        let reference = new ReferenceV1(guide.id, 'guide');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

}