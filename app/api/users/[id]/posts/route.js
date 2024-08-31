import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// the 'params' get populated if you pass dynamic variables into the url 
export const GET = async (req, {params}) => {
    try {
        // connect to the database
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts));

    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500});
    }
}