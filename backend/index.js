import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './src/routes/routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

await mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("____Connected_____")
})

app.get('/', (req, resp)=>{
    resp.send("Everything is perfect run ")
})

app.use('/home-state', router);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running")
});