import express from 'express';
import { userRouter } from './routes/user.js';
import sequelize from './connections/database.js';

const app = express();
const PORT = 4320;

app.use(express.json());

const connection = async ()  => {
    await sequelize.sync({ force: false });
};

connection();

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
