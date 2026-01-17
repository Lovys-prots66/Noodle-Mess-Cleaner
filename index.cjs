const rl = require("readline/promises");
const fs = require("fs/promises")
const path = require("path");

const availableExts = require('./types.json'); 

const individual = Object.values(availableExts).flatMap(item => item);

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

        let files = [];

        for(const directive of all){
            if(path.extname(directive)){
                files = [...files, path.extname(directive)];
            }
        }

        const uniques = new Set(files);
        return Array.from(uniques);

    } catch (error) {
        throw new Error(error.stack);
    }
}

async function cleanup(){
    try {
        const exts = gatherExts();

        Object.values(exts).includes

    } catch (error) {
        
    }
}

async function main(){
    try {
        
    } catch (error) {
        
    }
}


console.log(individual);

// console.log(availableExts);