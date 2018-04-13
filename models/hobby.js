'use strict';
module.exports = (sequelize, DataTypes) => {
  var hobby = sequelize.define('hobby', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    difficulty: DataTypes.FLOAT,
    levelOfProfficiency: DataTypes.FLOAT
  }, {
    classMethods: { 
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return hobby;

};
