import express from 'express';
import { userRouter } from './routes/user.js';
import sequelize from './connections/database.js';
import { taskRouter } from './routes/task.js';

const app = express();
const PORT = 4320;

app.use(express.json());
app.use('/user', userRouter);
app.use('/task', taskRouter);

const connection = async ()  => {
    await sequelize.sync({ force: false });
};

connection();

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
