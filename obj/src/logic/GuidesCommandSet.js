"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const GuideV1Schema_1 = require("../data/version1/GuideV1Schema");
class GuidesCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
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
    makeGetGuidesCommand() {
        return new pip_services_commons_node_2.Command("get_guides", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getGuides(correlationId, filter, paging, callback);
        });
    }
    makeGetRandomGuideCommand() {
        return new pip_services_commons_node_2.Command("get_random_guide", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.getRandomGuide(correlationId, filter, callback);
        });
    }
    makeGetGuideByIdCommand() {
        return new pip_services_commons_node_2.Command("get_guide_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('guide_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let guideId = args.getAsNullableString("guide_id");
            this._logic.getGuideById(correlationId, guideId, callback);
        });
    }
    makeCreateGuideCommand() {
        return new pip_services_commons_node_2.Command("create_guide", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('guide', new GuideV1Schema_1.GuideV1Schema()), (correlationId, args, callback) => {
            let guide = args.get("guide");
            this._logic.createGuide(correlationId, guide, callback);
        });
    }
    makeUpdateGuideCommand() {
        return new pip_services_commons_node_2.Command("update_guide", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('guide', new GuideV1Schema_1.GuideV1Schema()), (correlationId, args, callback) => {
            let guide = args.get("guide");
            this._logic.updateGuide(correlationId, guide, callback);
        });
    }
    makeDeleteGuideByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_guide_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('guide_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let guideId = args.getAsNullableString("guide_id");
            this._logic.deleteGuideById(correlationId, guideId, callback);
        });
    }
}
exports.GuidesCommandSet = GuidesCommandSet;
//# sourceMappingURL=GuidesCommandSet.js.map