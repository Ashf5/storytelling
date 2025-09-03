
import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes/router.js';
import './models/authModel.js'


const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);