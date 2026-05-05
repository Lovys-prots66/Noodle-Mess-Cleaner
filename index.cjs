#!/usr/bin/env node
const run = require("./utils/Dispatch.cjs");

(async function boot(){
    await run();
}());