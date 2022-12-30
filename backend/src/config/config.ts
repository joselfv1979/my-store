import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async (): Promise<void> => {
  const options: ConnectOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  } as ConnectOptions;
  
  await mongoose.connect(process.env.MONGO_URI as string, options);
};
