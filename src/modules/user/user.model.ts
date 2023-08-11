import mongoose, { model } from "mongoose";
import User from "./user.interface";
import bcryptjs from "bcryptjs";
import { NextFunction } from "express";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String, 
        required: true, 
        default: "user",
        enum: ["admin", "user"]
    }
}, {
    timestamps: true 
})


UserSchema.pre<User>("save", async function(next: NextFunction){
    if(!this.isModified("password")) {
        return next();
    }
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    console.log("Hashing ", this.password);
})

UserSchema.methods.isValidPassword = async function(password: string): Promise<boolean | Error> {
    return await bcryptjs.compare(password, this.password);
}

export default model<User>("User", UserSchema);