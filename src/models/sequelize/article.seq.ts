import Sequelize from 'sequelize'

export const Article = {
  title: {
    type: Sequelize.STRING
  },
  pages: {
    type: Sequelize.INTEGER
  }
}
