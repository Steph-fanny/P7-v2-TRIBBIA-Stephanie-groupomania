'use strict';
const { Model } = require('sequelize');
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
}

    Post.init({         
        content:{ type: DataTypes.TEXT, allowNull : false  },
        imageUrl: { type: DataTypes.STRING },
        likesCount: {type: DataTypes.INTEGER },
        
    },  
    {
      sequelize,    
      modelName: 'Post',
      timestamps: true,
    });
    
     return Post;
         
}   






//     static associate (models) {
//       Post.User = Post.belongsTo(User); 
//       Post.Comment = Post.hasMany(Comment);         
          
//     }
//   }

//     Post.init({
//         userId: { type : DataTypes.INTEGER },            
//         content:{ type: DataTypes.TEXT, allowNull : false  },
//         imageUrl: { type: DataTypes.STRING },
//         likesCount: {type: DataTypes.INTEGER },
        
//     },  
//     {
//       sequelize,    
//       modelName: 'Post',
//       timestamps: true,
//     });
    
//      return Post;
         
// }   

  
  
