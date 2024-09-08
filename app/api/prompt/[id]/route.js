// This route will have 3 separate requests:
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// * the findById is a Mongoose function

// GET - to read
export const GET = async (req, { params }) => {
    try {
        // connect to the database
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt){
            return new Response("Prompt not found.", {status: 404});
        }

        return new Response(JSON.stringify(prompt), {status: 200});

    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500});
    }
}


// PATCH - to update
export const PATCH = async (req, {params}) => {
    // get data to update
    const {prompt, tag, myFile} = await req.json();

    try {
        await connectToDB();
        // find existing prompt
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt){
            return new Response("Prompt not found.", {status: 404});
        }

        // update the existing prompt
        existingPrompt.prompt = prompt;
        // update the tag
        existingPrompt.tag = tag;
        existingPrompt.myFile = myFile;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200}); // return the updated prompt
    } catch (error) {
        return new Response("Failed to update.", {status: 500});
    }
}

// DELETE - to delete
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", {status: 200});

    } catch (error) {
        return new Response("Failed to delete.", {status: 500});
    }
}