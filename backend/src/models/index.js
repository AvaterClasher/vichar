const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = { sequelize, User, Post, initializeDatabase };
