const Sequelize = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  content: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  short_content: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  keywords: {
    type: Sequelize.STRING
  },
  thumbnail_image: {
    allowNull: false,
    type: Sequelize.STRING
  },
  status: {
    defaultValue: false,
    type: Sequelize.BOOLEAN
  },
  created_at: {
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    type: Sequelize.DATE
  },
  updated_at: {
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    type: Sequelize.DATE
  },
  deleted_at: {
    allowNull: true,
    type: Sequelize.DATE
  }
};
