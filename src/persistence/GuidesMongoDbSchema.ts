import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let GuidesMongoDbSchema = function (collection?: string) {
    collection = collection || 'guides';

    let guidePageSchema = new Schema(
        {
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

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },
            name: { type: String, required: true },
            type: { type: String, required: true/*, enum: enums.GUIDE_TYPES*/ },
            app: { type: String, required: false },
            min_ver: { type: String, required: false },
            max_ver: { type: String, required: false },

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
        },
        {
            collection: collection,
            autoIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}