const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');
const log = require('../logger').log;

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    log.success('Database connected!');
    await sequelize.sync({ alter: true });
  } catch (error) {
    log.fatal('Database connection error:', error);
  }
};

module.exports = { sequelize, User, Post, initializeDatabase };
