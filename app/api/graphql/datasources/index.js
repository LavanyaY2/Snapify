// MongoDB data source to facilitate interaction between the application and MongoDB
import User from "@models/user";
import { MongoDataSource } from "apollo-datasource-mongodb";


export default class Users extends MongoDataSource {

    // Function to fetch all users
    async fetchUsers() {
        try {
            return await User.find();
        } catch (error) {
            console.log("Failed to fetch users");
        }
    }

    // Function to create new user
    async createUser(input) {
        try {
            return await User.create({...input});
        } catch (error) {
            console.log("Failed to create user");
        }
    }
}
