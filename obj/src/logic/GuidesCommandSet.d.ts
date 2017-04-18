import { CommandSet } from 'pip-services-commons-node';
import { IGuidesBusinessLogic } from './IGuidesBusinessLogic';
export declare class GuidesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IGuidesBusinessLogic);
    private makeGetGuidesCommand();
    private makeGetRandomGuideCommand();
    private makeGetGuideByIdCommand();
    private makeCreateGuideCommand();
    private makeUpdateGuideCommand();
    private makeDeleteGuideByIdCommand();
}
