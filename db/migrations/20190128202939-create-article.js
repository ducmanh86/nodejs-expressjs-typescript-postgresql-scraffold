'use strict';
const Article = require('../models/article.seq');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('article', Article);
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('article');
  }
};
