import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/database.js'

const Transfer = sequelize.define('transfers', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

export default Transfer;