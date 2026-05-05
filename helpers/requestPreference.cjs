const rl = require("readline/promises");

async function requestPreference(question = ""){
    const prompt = rl.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    try {
        process.on("SIGINT", () => {
            console.log("\nExiting...");
            prompt.close();
            process.exit(0);
        });
    
        const input = await prompt.question(question);
        prompt.close();
        return input;
    } catch (error) {
        if(error.name === "AbortError"){
            console.log("\nExiting...");
            prompt.close();
            process.exit(0);
        }else{
            prompt.close();
            throw new Error(error.message);
        }
    }
}

module.exports = requestPreference;