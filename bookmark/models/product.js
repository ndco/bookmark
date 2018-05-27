'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    job_id: DataTypes.STRING,
    name: DataTypes.STRING,
    shop_name: DataTypes.STRING,
    shop_url: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image_url: DataTypes.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.hasMany(models.bookmark, {
      foreignKey: { name: 'product_id' },
      onDelete: "CASCADE"
    });
  };
  return product;
};