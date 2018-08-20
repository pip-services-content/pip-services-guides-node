import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { GuidesServiceFactory } from '../build/GuidesServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class GuidesProcess extends ProcessContainer {

    public constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
