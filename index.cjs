const rl = require("readline/promises");
const fs = require("fs/promises")
const path = require("path");

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

        let files;

        // await Promise.all([])

        return all;
    } catch (error) {
        throw new Error(error.message);
    }
}

console.log(gatherExts("C:\\Users\\lenovo\\Desktop\\ctrl regio").then(console.log)); 