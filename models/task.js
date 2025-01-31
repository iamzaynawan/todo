import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const taskModel = sequelize.define('Task', {
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
    tableName: 'Task',
});

export { taskModel };
