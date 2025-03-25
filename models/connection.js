import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

const testConnection = async () => {
  try {
    await connection.authenticate();
    console.log('Sequelize connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default connection;