import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { GuidePageV1 } from './GuidePageV1';

export class GuideV1 implements IStringIdentifiable {

    public constructor(id: string, type: string, app?: string,
        name?: string, min_ver?: number, max_ver?: number, pages?: GuidePageV1[]) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.app = app;
        this.min_ver = min_ver;
        this.max_ver = max_ver;
        this.pages = pages || [];

        this.create_time = new Date();
    }

    /* Identification */
    public id: string;
    public name: string;
    public type: string;
    public app?: string;
    public min_ver?: number;
    public max_ver?: number;

    /* Automatically managed fields */
    public create_time: Date;

    /* Content */
    public pages: GuidePageV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
