import express from 'express';
import contactRoute from './routes/contactRoute.js';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/dbConnection.js';
import userRouter from './routes/userRoute.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/contacts', contactRoute);
app.use('/api/user', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});