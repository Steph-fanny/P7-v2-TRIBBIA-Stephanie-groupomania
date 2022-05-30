'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
  }           
  
  Comment.init({
    content: { type: DataTypes.TEXT, allowNull: false },
    createdAt : {type : DataTypes.DATE, allowNull : false }
  }, 
    {
      sequelize,
      modelName: 'Comment',
      timestamps: true
  })

  return Comment;
};






  