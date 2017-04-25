import { CommandSet } from 'pip-services-commons-node';
import { IGuidesController } from './IGuidesController';
export declare class GuidesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IGuidesController);
    private makeGetGuidesCommand();
    private makeGetRandomGuideCommand();
    private makeGetGuideByIdCommand();
    private makeCreateGuideCommand();
    private makeUpdateGuideCommand();
    private makeDeleteGuideByIdCommand();
}
