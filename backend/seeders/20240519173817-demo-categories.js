'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'celulares',
        description: 'Categoría de celulares',
        createdAt: '2024-05-13 23:54:17',
        updatedAt: '2024-05-13 23:54:17'
      },
      {
        id: 2,
        name: 'tabletas',
        description: 'Categoría de tabletas',
        createdAt: '2024-05-13 23:54:17',
        updatedAt: '2024-05-13 23:54:17'
      },
      {
        id: 3,
        name: 'notebooks',
        description: 'Categoría de notebooks',
        createdAt: '2024-05-13 23:54:17',
        updatedAt: '2024-05-13 23:54:17'
      },
      {
        id: 4,
        name: 'consolas',
        description: 'Categoría de consolas',
        createdAt: '2024-05-13 23:54:17',
        updatedAt: '2024-05-13 23:54:17'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

