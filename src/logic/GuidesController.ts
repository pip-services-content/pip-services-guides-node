let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { GuidePageV1 } from '../data/version1/GuidePageV1';
import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesPersistence } from '../persistence/IGuidesPersistence';
import { IGuidesBusinessLogic } from './IGuidesBusinessLogic';
import { GuidesCommandSet } from './GuidesCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class GuidesController implements IConfigurable, IReferenceable, ICommandable, IGuidesBusinessLogic {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-guides:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(GuidesController._defaultConfig);
    private _persistence: IGuidesPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: GuidesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IGuidesPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new GuidesCommandSet(this);
        return this._commandSet;
    }

    public getGuides(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<GuideV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getRandomGuide(correlationId: string, filter: FilterParams, 
        callback: (err: any, guide: GuideV1) => void): void {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }

    public getGuideById(correlationId: string, guideId: string,
        callback: (err: any, item: GuideV1) => void): void {
        this._persistence.getOneById(correlationId, guideId, callback);
    }

    public createGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void {
        let newGuide: GuideV1 = null;

        guide.create_time = new Date();
        guide.all_tags = TagsProcessor.extractHashTags(
            guide, 
            'title.en', 'title.sp', 'title.fr', 'title.de', 'title.ru',
            'content.en', 'content.sp', 'content.fr', 'content.de', 'content.ru'
        );

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

    public updateGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void {
        let oldGuide: GuideV1 = null;
        let newGuide: GuideV1 = null;
        
        guide.all_tags = TagsProcessor.extractHashTags(
            guide, 
            'title.en', 'title.sp', 'title.fr', 'title.de', 'title.ru',
            'content.en', 'content.sp', 'content.fr', 'content.de', 'content.ru'
        );

        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, guide.id, (err, data) => {
                    oldGuide = data;
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            correlationId,
                            'GUIDE_NOT_FOUND',
                            'Guide ' + guide.id + ' was not found'
                        ).withDetails('guide_id', guide.id);
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
                this._attachmentsConnector.updateAttachments(
                    correlationId, oldGuide, newGuide, callback);
            }
        ], (err) => {
            callback(err, newGuide);
        });
    }

    public deleteGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void {
        let oldGuide: GuideV1 = null;

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
