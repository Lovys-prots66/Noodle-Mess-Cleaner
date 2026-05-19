const requestPreference = require("../helpers/requestPreference.cjs");
const Cleaner = require("./cleanUp.cjs");

const dirAccessible = require("../helpers/dirAccessible.cjs");

module.exports = async function run(){
    const dir = process.cwd();

    let cleanupType;
    do {
        cleanupType = await requestPreference("Which method you would like the cleanup to be done.\n\t[1] : In a new directory\n\t[2] : Just whithin the current directory.\n\n-->");
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

        await cleaner.cleanupTypeOne(dir, targetDir);
    }else if(cleanupType == 2){
        await cleaner.cleanupTypeTwo(dir);
    }

    console.log("\nCleanup complete. Exiting...");
}
