'use strict';
module.exports = (sequelize, DataTypes) => {
  var bookmark = sequelize.define('bookmark', {
    isBookmarked: DataTypes.BOOLEAN
  }, {});
  bookmark.associate = function(models) {
    // associations can be defined here
    bookmark.belongsTo(models.product, { foreignKey: 'product_id' });
    bookmark.belongsTo(models.user, { foreignKey: 'user_id' });
  };
  return bookmark;
};