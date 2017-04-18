import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class GuidesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('guides');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-guides', 'controller', 'default', '*', '1.0'));
    }
}