const fs = require("fs/promises")
const path = require("path");

// gather all file extensions in the given directory
async function gatherExts(dir = ""){
    try {
        const all = await fs.readdir(dir, { recursive : true });

        let files = {};

        for(const directive of all){
            if(path.extname(directive)){
                files = {...files, [directive] : path.extname(directive)};
            }
        }

        return files;

    } catch (error) {
        throw new Error(error.stack);
    }
}

module.exports = gatherExts;