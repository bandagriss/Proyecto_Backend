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
    return queryInterface.bulkInsert('roles', [
      {
        nombre: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Técnico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Responsable',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Investigador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Coordinador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Director',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('roles', null, {});    
  }
};
