'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    //  static associate (models) {
    //   Comment.belongsTo(models.User, { foreignKey: 'userId' })
    //   Comment.belongsTo(models.Post, { foreignKey: 'postId' })
    // }

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






      
    // postId: { type : DataTypes.INTEGER },  
    // content: { type: DataTypes.TEXT, allowNull: false },
    // userId: { type : DataTypes.INTEGER },
    // createdAt : {type : DataTypes.DATE, allowNull : false }
//   }, 
//   {
//     sequelize,
//     modelName: 'Comment',
//      timestamps: true
//   })
 

//   return Comment;
// };