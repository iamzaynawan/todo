import { Sequelize } from 'sequelize';

import { userModel } from '../models/user.js';
import { taskModel } from '../models/task.js';

const sequelize = new Sequelize('crud', 'postgres', 'fadec19B', {
    host: 'localhost',
    dialect: 'postgres',
});

let User = null;
let Task = null;

const databaseConnection = async () => {
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

export { User, Task, sequelize, databaseConnection };