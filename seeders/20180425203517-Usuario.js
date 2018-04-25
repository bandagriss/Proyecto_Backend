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
    return queryInterface.bulkInsert('usuarios', [{
      fid_rol: 1,
      fid_institucion: 1,
      nombres: 'Admin Administrador',
      username: 'admin',
      password: '123456',
      nro_carnet: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
