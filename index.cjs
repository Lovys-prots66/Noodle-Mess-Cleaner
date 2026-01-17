const rl = require("readline/promises");
const fs = require("fs/promises")
const path = require("path");

const availableExts = require('./types.json'); 

// prompt user for directory path (soon)
async function requestPreference(question = ""){
    const prompt = rl.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    const input = await prompt.question(question);

    return input;
}

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

// cleanup by copying files to target directory
async function cleanupTypeOne(dir = "", targetDir = ""){
    try {

        const files = await gatherExts(dir);

        // copy files to their respective subdirectories
        for(const [key1, value1] of Object.entries(files)){
            for(const [key2, value2] of Object.entries(availableExts)){

                if((Array.isArray(value2) && value2.includes(value1)) || key1 == value2){
                    
                    const subdir = path.join(targetDir, key2);
                    
                    if(!await fs.stat(subdir).catch(() => false)){
                        await fs.mkdir(subdir);
                    }

                    await fs.copyFile(path.join(dir, key1), path.join(subdir, path.basename(key1)));

                }
                
            }
            
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

// cleanup inside the given directory
async function cleanupTypeTwo(dir = ""){
    try {

        const files = await gatherExts(dir);

        // move files to their respective subdirectories
        for(const [key1, value1] of Object.entries(files)){
            for(const [key2, value2] of Object.entries(availableExts)){

                if((Array.isArray(value2) && value2.includes(value1)) || key1 == value2){
                    
                    const subdir = path.join(dir, key2);
                    
                    if(!await fs.stat(subdir).catch(() => false)){
                        await fs.mkdir(subdir);
                    }

                    await fs.rename(path.join(dir, key1), path.join(subdir, path.basename(key1)));

                }
                
            }
            
        }

    } catch (error) {
        throw new Error(error.message);
    }
}