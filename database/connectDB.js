import mongoose from "mongoose";
mongoose.set("strictQuery", false);
try {
    await mongoose.connect(process.env.URI);
    console.log("🚀 DB Conectada ");
} catch (error) {
    console.log(error);
}
