// libraries
import mongoose from "mongoose";

// env variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error(
    "Please add your MONGODB_URI to .env"
  );
}
if (!dbName) {
  throw new Error(
    "Please add your DB_NAME to .env"
  );
}

const connectDB = async (): Promise<void> => {
  // check if already connected
  if (!mongoose.connection.readyState) {
    await mongoose
      .connect(uri, {
        dbName
      })
      .then(() => {
        console.log(
          "MongoDB Connected Successfully"
        );
      })
      .catch((error: any) => {
        console.error(
          "Error connecting to MongoDB:",
          error
        );
        process.exit();
      });
  }
};

export default connectDB;
