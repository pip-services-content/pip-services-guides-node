import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class GuidesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/guides');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}