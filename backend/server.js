import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/dbConnection.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import swaggerUi from "swagger-ui-express";
import specs from "./swagger/swagger.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});