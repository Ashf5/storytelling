
import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes/router.js';
import cors from 'cors';
import './models/authModel.js'


const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://storytelling-client.onrender.com/'],
    credentials: true, 
  })
)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


app.use(express.json());
app.use(cookieParser());
app.use('/api', router);