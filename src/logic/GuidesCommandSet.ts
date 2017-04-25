import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { GuideV1 } from '../data/version1/GuideV1';
import { GuidePageV1Schema } from '../data/version1/GuidePageV1Schema';
import { GuideV1Schema } from '../data/version1/GuideV1Schema';
import { IGuidesController } from './IGuidesController';

export class GuidesCommandSet extends CommandSet {
    private _logic: IGuidesController;

	constructor(logic: IGuidesController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetGuidesCommand());
		this.addCommand(this.makeGetRandomGuideCommand());
		this.addCommand(this.makeGetGuideByIdCommand());
		this.addCommand(this.makeCreateGuideCommand());
		this.addCommand(this.makeUpdateGuideCommand());
		this.addCommand(this.makeDeleteGuideByIdCommand());
	}

	private makeGetGuidesCommand(): ICommand {
		return new Command(
			"get_guides",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getGuides(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetRandomGuideCommand(): ICommand {
		return new Command(
			"get_random_guide",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				this._logic.getRandomGuide(correlationId, filter, callback);
			}
		);
	}

	private makeGetGuideByIdCommand(): ICommand {
		return new Command(
			"get_guide_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('guide_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let guideId = args.getAsNullableString("guide_id");
				this._logic.getGuideById(correlationId, guideId, callback);
			}
		);
	}

	private makeCreateGuideCommand(): ICommand {
		return new Command(
			"create_guide",
			new ObjectSchema(true)
				.withRequiredProperty('guide', new GuideV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let guide = args.get("guide");
				this._logic.createGuide(correlationId, guide, callback);
			}
		);
	}

	private makeUpdateGuideCommand(): ICommand {
		return new Command(
			"update_guide",
			new ObjectSchema(true)
				.withRequiredProperty('guide', new GuideV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let guide = args.get("guide");
				this._logic.updateGuide(correlationId, guide, callback);
			}
		);
	}

	private makeDeleteGuideByIdCommand(): ICommand {
		return new Command(
			"delete_guide_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('guide_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let guideId = args.getAsNullableString("guide_id");
				this._logic.deleteGuideById(correlationId, guideId, callback);
			}
		);
	}

}