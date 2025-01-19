import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import { userModel } from './models/user.model';
import { taskModel } from './models/task.model';


const app = express();
const PORT = 4320;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});

const sequelize = new Sequelize('crud', 'postgres', 'fadec19B', {
    host: 'localhost',
    dialect: 'postgres',
});

let User = null;
let Task = null;

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false });
        User = userModel;
        Task = taskModel;
        console.log("Database Synced");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connection();

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try{
        await User.create({ email, password});
        res.status(201).json({ message: 'User added successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (!user || password !== user.password) {
            return res.status(500).json({ message: 'User Not Found' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
});

app.post('/task/:userId', (req,res) => {
    const userId = req.params.userId;
    const task = req.body;
    try {
        Task.create({userId, task});
        res.status(201).json({ message: 'Task Assigned Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in Assigning Task', error })
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.get('/task/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const Tasks = await Task.findAll({ where: { userId } });
        if(Tasks !== null){
            return res.status(200).json(Tasks);
        }else{
            res.status(500).json('User has no tasks');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Tasks', error });
    }
});
