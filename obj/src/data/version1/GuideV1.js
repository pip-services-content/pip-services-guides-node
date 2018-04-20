"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GuideV1 {
    constructor(id, type, app, name, min_ver, max_ver, pages) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.app = app;
        this.min_ver = min_ver;
        this.max_ver = max_ver;
        this.pages = pages || [];
        this.create_time = new Date();
    }
}
exports.GuideV1 = GuideV1;
//# sourceMappingURL=GuideV1.js.map