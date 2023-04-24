import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // => Para que no se hashee de nuevo la pass en un put

    try {
        this.password = await bcryptjs.hash(this.password, 10);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Fallo hash password ");
    }
});

userSchema.methods.comparePassword = async function (passwordClient) {
    return await bcryptjs.compare(passwordClient, this.password);
};

export const User = model("User", userSchema);
