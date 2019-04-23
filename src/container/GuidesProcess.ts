import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { GuidesServiceFactory } from '../build/GuidesServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class GuidesProcess extends ProcessContainer {

    public constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
