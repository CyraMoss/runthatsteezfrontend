import mongoose from "mongoose";

export interface User {
  _id?: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
  role: string;
  sessions?: { sessionToken: string; expires: Date }[];
  products?: mongoose.Types.ObjectId[]; // Reference to products owned by the user
}
