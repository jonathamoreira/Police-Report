import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDb Atlas conectado"))
    .catch((err) => console.log(err));
};

export default connectDatabase;
