import mongoose from "mongoose";

let isConnected = false; // to track database connection

export const connectToDB = async () => {

    // create connection to database

    // set up the mongoose query
    mongoose.set('strictQuery', true);

    // check if we're already connected
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    // if not connected - establish a connection
    try {
        // MONGODB_URI = uri of the mongodb atlast instance - uri for the actual database 
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("MongoDB is connected");
    } catch (error) {

        // console log the error
        console.log("ERROR WHEN CONNECTING: ");
        console.log(error);
    }
}