import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

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

let user = null;
let userTask = null;

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'User',
    timestamps: false,
});

const UserTaskModel = sequelize.define('UserTask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'UserTask',
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false });
        user = UserModel;
        userTask = UserTaskModel;
        console.log("Database Synced");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connection();

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try{
        await user.create({ email, password});
        res.status(201).json({ message: 'User added successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await user.findOne({ where: { email } });
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
        userTask.create({userId, task});
        res.status(201).json({ message: 'Task Assigned Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in Assigning Task', error })
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await user.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.get('/task/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const Tasks = await userTask.findAll({ where: { userId } });
        if(Tasks !== null){
            return res.status(200).json(Tasks);
        }else{
            res.status(500).json('User has no tasks');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Tasks', error });
    }
});
