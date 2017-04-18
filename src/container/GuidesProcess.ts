import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { GuidesFactory } from '../build/GuidesFactory';

export class GuidesProcess extends ProcessContainer {

    public constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesFactory);
    }

}
