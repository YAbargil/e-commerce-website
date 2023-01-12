import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected to the DB successfuly"))
  .catch((err) => {
    console.log("Couldn't connect successfully to the  DB.");
    console.error(err);
  });
export default mongoose;
