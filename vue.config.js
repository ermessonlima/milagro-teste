module.exports = {
  configureWebpack: {
    externals: {
      sequelize: "require('sequelize')",
    },
  },
  pluginOptions: {
    electronBuilder: {
      externals: ['sequelize'],
    }
  },
}