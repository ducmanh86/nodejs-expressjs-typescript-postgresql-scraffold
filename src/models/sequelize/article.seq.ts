import Sequelize from 'sequelize'

export default {
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
  }
}
