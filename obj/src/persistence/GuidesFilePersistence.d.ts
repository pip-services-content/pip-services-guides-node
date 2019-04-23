import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { GuidesMemoryPersistence } from './GuidesMemoryPersistence';
import { GuideV1 } from '../data/version1/GuideV1';
export declare class GuidesFilePersistence extends GuidesMemoryPersistence {
    protected _persister: JsonFilePersister<GuideV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
