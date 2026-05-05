const fs = require("node:fs/promises")

async function dirAccessible(dir){
    try {
        await fs.access(dir);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = dirAccessible;