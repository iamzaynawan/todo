import express from 'express';
import { databaseConnection } from './connections/database.js';
import { userRouter } from './routes/user.js';

const app = express();
const PORT = 4320;

app.use(express.json());

databaseConnection();

app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
