import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/sessionslab3';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectMongoDB();

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, expires: '1d', default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

export { mongoose, Session };
