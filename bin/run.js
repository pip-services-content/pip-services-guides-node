let GuidesProcess = require('../obj/src/container/GuidesProcess').GuidesProcess;

try {
    new GuidesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
