'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
   class User extends Model {
    static associate (models) {   

      User.hasMany(models.Post,{ foreignKey: 'userId'})  
      User.hasMany(models.Comment,{ foreignKey: 'userId'})  
    }
  }
 
  User.init({
    firstName: { type: DataTypes.STRING, allowNull : false },
    lastName: { type: DataTypes.STRING, allowNull : false },
    email: { type: DataTypes.STRING, unique: true, allowNull : false },
    password: { type:DataTypes.STRING, allowNull : false },
    imageUrl: { type:DataTypes.STRING, allowNull: true, },
    isAdmin: { type:DataTypes.BOOLEAN, allowNull : false },
    
  }, 
  {
    sequelize,
    modelName: 'User'
   
    });
    
    return User;
};