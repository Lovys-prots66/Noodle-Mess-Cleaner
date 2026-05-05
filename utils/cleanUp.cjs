const fs = require("fs/promises");
const path = require("path");
const gatherExts = require("../helpers/gatherExts.cjs");

class Cleaner{
    
    #availableExts = require('../types.json'); 

    // cleanup by copying files to target directory
    async cleanupTypeOne(dir = "", targetDir = ""){
        try {
    
            const files = await gatherExts(dir);
    
            // copy files to their respective subdirectories
            for(const [key1, value1] of Object.entries(files)){
                for(const [key2, value2] of Object.entries(this.#availableExts)){
    
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
    async cleanupTypeTwo(dir = ""){
        try {

            const files = await gatherExts(dir);

            // move files to their respective subdirectories
            for(const [key1, value1] of Object.entries(files)){
                for(const [key2, value2] of Object.entries(this.#availableExts)){

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
}

module.exports = Cleaner;
