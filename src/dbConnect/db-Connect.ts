import mongoose from 'mongoose';

export const dbConnect = async () => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const uri = `mongodb+srv://${user}:${password}@cluster0.nvhsutx.mongodb.net/to_do_list?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
