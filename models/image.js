image: {
  type: Sequelize.STRING,
  allowNull: true,
  validate: { isUrl: { msg: "Invalid image URL" } }
}
