'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('hobbies', [{
        name: 'playing guitar',
        description: "6 stringed instrument- nylon vs steel strings, classical vs flamenco, acoustic vs electric",
        difficulty: 3,
        levelOfProfficiency: 3
      }, 
      {
        name: "drawing",
        description: "pencil to paper",
        difficulty: 2,
        levelOfProfficiency: 2
      }
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('hobbies', null, {});
  }
};
