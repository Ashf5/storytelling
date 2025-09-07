
import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes/router.js';
import cors from 'cors';
import './models/authModel.js'


const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true, // ✅ allow cookies
  })
)

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);