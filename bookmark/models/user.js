'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.bookmark, {
      foreignKey: { name: 'user_id' },
      onDelete: "CASCADE"
    });
  };
  return user;
};