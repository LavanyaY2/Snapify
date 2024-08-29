// imports from mongoose to interact with the mongodb database
import { Schema, model, models } from "mongoose";

// the "models" obj provided by mongoose stores all registered models - prevents redefining of models
// if model does not exist, the "model" function is called to create a new model

// newSchema is our function
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match:  [/^[A-Za-z][A-Za-z0-9_]{4,29}$/, 'Username is invalid']
    },
    image: {
        type: String,
    }
});

// since the route is only be running when it's called - so we need to check if model exists
const User = models.User || model("User", UserSchema);

export default User;