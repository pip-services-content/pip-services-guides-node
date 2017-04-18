import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class GuidesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('guides');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}