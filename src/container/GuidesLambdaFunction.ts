import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { GuidesFactory } from '../build/GuidesFactory';

export class GuidesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("guides", "System guides function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-guides', 'controller', 'default', '*', '*'));
        this._factories.add(new GuidesFactory());
    }
}

export const handler = new GuidesLambdaFunction().getHandler();