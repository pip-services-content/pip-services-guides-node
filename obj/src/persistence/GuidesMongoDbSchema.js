"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.GuidesMongoDbSchema = function (collection) {
    collection = collection || 'guides';
    let guidePageSchema = new mongoose_1.Schema({
        /* Content */
        title: { type: Mixed, required: true },
        content: { type: Mixed, required: true },
        more_url: { type: String, required: false },
        color: { type: String, required: false },
        pic_id: { type: String, required: false },
        pic_uri: { type: String, required: false },
        /* Custom fields */
        custom_dat: { type: Mixed, required: false }
    });
    guidePageSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        type: { type: String, required: true /*, enum: enums.GUIDE_TYPES*/ },
        app: { type: String, required: false },
        version: { type: String, required: false },
        /* Automatically managed fields */
        create_time: { type: Date, required: true, 'default': Date.now },
        /* Content */
        pages: { type: [guidePageSchema], required: false },
        /* Status */
        status: { type: String, required: true, 'default': 'new' },
        /* Search  */
        tags: { type: [String], required: false },
        // All tags = tags + hashtags
        all_tags: { type: [String], required: false, index: true },
        /* Custom fields */
        custom_hdr: { type: Mixed, required: false },
        custom_dat: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=GuidesMongoDbSchema.js.map