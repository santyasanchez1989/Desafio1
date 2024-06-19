//Codigo de configuracion de mongoose. Con datos de mi servidor, etc.

import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect("mongodb+srv://santiago:37x3byifjUG2dFeF@backend.f6prvy6.mongodb.net/proyectofinal");
    console.log("Conectado a base de datos de Mongo DB");
  } catch (error) {
    console.log(`${error}`);
  
  }
};