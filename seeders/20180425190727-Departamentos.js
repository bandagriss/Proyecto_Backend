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
    return queryInterface.bulkInsert('departamentos', [
      { nombre: 'La Paz', createdAt: new Date(), updatedAt: new Date() },      
      { nombre: 'Cochabamba', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Santa Cruz', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Oruro', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Potosí', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Chuquisaca', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tarija', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pando', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Beni', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('departamentos', null, {});
  }
};
