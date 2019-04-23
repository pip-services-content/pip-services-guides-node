import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';
import { GuideV1 } from '../data/version1/GuideV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds(guide);
    addAttachments(correlationId: string, guide: GuideV1, callback: (err: any) => void): void;
    updateAttachments(correlationId: string, oldGuide: GuideV1, newGuide: GuideV1, callback: (err: any) => void): void;
    removeAttachments(correlationId: string, guide: GuideV1, callback: (err: any) => void): void;
}
