const rl = require("readline/promises");
const fs = require("fs/promises")
const path = require("path");

const availableExts = require('./types.json'); 

const individual = Object.values(availableExts).flatMap(item => item).toSorted();

async function requestPreference(question = ""){
    const prompt = rl.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    const input = await prompt.question(question);

    return input;
}

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

async function cleanupTypeOne(dir = "", targetDir = ""){
    try {

        const files = await gatherExts(dir);

        // console.log(baseDir);

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

async function main(){
    try {
        
    } catch (error) {
        
    }
}


console.log(individual);

// console.log(gatherExts("C:\\Users\\lenovo\\Desktop\\ctrl regio").then(console.log));
cleanupTypeOne("C:\\Users\\lenovo\\Desktop\\ctrl regio", "C:\\Users\\lenovo\\Desktop\\target")

console.log(Object.values(availableExts));
// console.log(Object.);