import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    // grab the things we have passed through the POST request
    const { userId, prompt, tag, myFile } = await req.json();

    // connect to the database
    try {

        // since it's a lambda function - connect to database every single time
        await connectToDB();
        
        // once we are connected- create the prompt using the 'Prompt' model
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            myFile
        })

        await newPrompt.save(); // to save the prompt to the database
        return new Response(JSON.stringify(newPrompt));

    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500});
    }

}