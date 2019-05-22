"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_mongoose_node_1 = require("pip-services3-mongoose-node");
const GuidesMongooseSchema_1 = require("./GuidesMongooseSchema");
class GuidesMongoDbPersistence extends pip_services3_mongoose_node_1.IdentifiableMongoosePersistence {
    constructor() {
        super('guides', GuidesMongooseSchema_1.GuidesMongooseSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });
        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });
        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });
        // Search by tags
        let tags = filter.getAsObject('tags');
        if (tags) {
            let searchTags = pip_services3_commons_node_2.TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.GuidesMongoDbPersistence = GuidesMongoDbPersistence;
//# sourceMappingURL=GuidesMongoDbPersistence.js.map