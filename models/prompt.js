import {Schema, model, models} from 'mongoose';

const PromptSchema = new Schema ({
    creator: {
        // a 'creator' will be a document in the database - specifically - the user type
        type: Schema.Types.ObjectId,
        // the 'ref' prop is used to create a reference to another model in a MongoDB database
        // the ObjectId refers to the model "User"
        ref: "User", 
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required."],
    }
});

// since the route is only be running when it's called - so we need to check if model exists
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;

