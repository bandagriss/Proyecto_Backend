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
    return queryInterface.bulkInsert('instituciones', [
      {
        fid_departamento: 1,
        nombre: 'Ceadl La Paz',
        descripcion: 'ONG al servicio de la sociedad',
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
    return queryInterface.bulkDelete('instituciones', null, {});
  }
};
