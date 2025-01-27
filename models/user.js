import { DataTypes } from "sequelize";
import { sequelize } from '../connections/database.js';

const userModel = sequelize.define('User', {
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

export { userModel };
