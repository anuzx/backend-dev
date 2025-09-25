import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    //select: false tells Mongoose: by default don’t include this field in query results. This reduces the chance of accidentally sending passwords back to clients. To receive it in a query you must explicitly request it
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false }, //salt is used for hashing the password in a secure way.
    // Also hidden by default (select: false).
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

//controllers

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = ( id: string , values: Record<string, any> ) => UserModel.findByIdAndUpdate(id, values);