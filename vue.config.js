module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: { publish: [{ provider: "github", owner: "Ermesson Lima", private: false }] }
    }
  }
}
