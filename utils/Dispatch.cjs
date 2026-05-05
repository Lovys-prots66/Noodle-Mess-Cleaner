const requestPreference = require("../helpers/requestPreference.cjs");
const Cleaner = require("./cleanUp.cjs");

const fs = require("fs/promises");
const dirAccessible = require("../helpers/dirAccessible.cjs");

module.exports = async function run(){
    let dir;

    do {
        dir = await requestPreference("Which directory you wish to cleanup?\n-->");
        if(!dir || !await dirAccessible(dir)) console.log("Please provide a proper directory.");    
    } while (!dir || !await dirAccessible(dir));

    let cleanupType;
    do {
        cleanupType = await requestPreference("Which method you would like the cleanup to be done.\n\t[1] : In a new directory\n\t[2] : Just whithin the provided directory.\n\n-->");
        if(!cleanupType || (cleanupType != 1 && cleanupType != 2)){
            console.log("Please provide a proper answer.");
        }
    } while (!cleanupType || (cleanupType != 1 && cleanupType != 2));

    const cleaner = new Cleaner();

    if(cleanupType == 1){
        let targetDir;
        do {
            targetDir = await requestPreference("Where should the cleanup be done?\n-->");
            if(!targetDir){ 
                console.log("Please provide a directory.");
            }
            else if(!(await dirAccessible(targetDir))){ 
                console.log("Directory inaccessible");
                targetDir = null;
            }
        } while (!targetDir);

        cleaner.cleanupTypeOne(dir = dir, targetDir = targetDir);
    }else if(cleanupType == 2){
        cleaner.cleanupTypeTwo(dir);
    }

    console.log("\nCleanup complete. Exiting...");
    process.exit(0);
}