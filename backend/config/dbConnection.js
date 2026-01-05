import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection successful', conn.connection.host,conn.connection.name)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;