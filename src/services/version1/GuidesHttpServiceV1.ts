import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class GuidesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/guides');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}