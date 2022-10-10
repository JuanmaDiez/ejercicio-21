module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "comment",
    },
  );

  return Comment;
};
