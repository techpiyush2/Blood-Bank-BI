import mongoose from 'mongoose'
import { Config } from './config.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(Config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB connected Successfully`.cyan)
  } catch (error) {
    console.error(`Error: ${error}`.red.underline)
    process.exit(1)
  }
}

export default connectDB
