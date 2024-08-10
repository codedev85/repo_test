import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://zaccheausolawuyi:FOJveJaV2VKA7KL9@cluster0.dnhgned.mongodb.net/github_test?retryWrites=true&w=majority', {
     
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
