import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sayurianuththara20:sayuri20@cluster0.cn4whu4.mongodb.net/flavour-flight').then(()=>console.log("DB Connected"));
}


