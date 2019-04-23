import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { GuidesServiceFactory } from '../build/GuidesServiceFactory';

export class GuidesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("guides", "System guides function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-guides', 'controller', 'default', '*', '*'));
        this._factories.add(new GuidesServiceFactory());
    }
}

export const handler = new GuidesLambdaFunction().getHandler();