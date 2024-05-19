'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'ps5',
        description: 'Consola PlayStation 5',
        price: 499.99,
        stock: 47,
        categoryId: 4,
        imageUrl: '/images/ps5.png',
        isFeatured: false,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-17 21:03:40'
      },
      {
        id: 2,
        name: 'nintendoSwitch',
        description: 'Consola Nintendo Switch',
        price: 299.99,
        stock: 95,
        categoryId: 4,
        imageUrl: '/images/nintendo.png',
        isFeatured: false,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-18 00:27:25'
      },
      {
        id: 3,
        name: 'xbox',
        description: 'Consola Xbox Series X',
        price: 499.99,
        stock: 64,
        categoryId: 4,
        imageUrl: '/images/xbox.png',
        isFeatured: false,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-18 18:50:00'
      },
      {
        id: 4,
        name: 'samsung s24 ultra',
        description: 'Smartphone Samsung Galaxy S24 Ultra',
        price: 1199.99,
        stock: 197,
        categoryId: 1,
        imageUrl: '/images/samsung.png',
        isFeatured: true,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-18 18:50:00'
      },
      {
        id: 5,
        name: 'iphone 15 pro max',
        description: 'Smartphone iPhone 15 Pro Max',
        price: 1299.99,
        stock: 148,
        categoryId: 1,
        imageUrl: '/images/iphone.png',
        isFeatured: false,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-18 14:09:04'
      },
      {
        id: 6,
        name: 'razer blade 14',
        description: 'Laptop Razer Blade 14',
        price: 1999.99,
        stock: 30,
        categoryId: 3,
        imageUrl: '/images/razer.png',
        isFeatured: false,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-14 01:09:54'
      },
      {
        id: 7,
        name: 'macbook pro',
        description: 'Laptop Apple MacBook Pro',
        price: 2399.99,
        stock: 40,
        categoryId: 3,
        imageUrl: '/images/macbook.png',
        isFeatured: false,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-14 01:09:54'
      },
      {
        id: 8,
        name: 'ipad pro',
        description: 'Tableta Apple iPad Pro',
        price: 999.99,
        stock: 77,
        categoryId: 2,
        imageUrl: '/images/ipad.png',
        isFeatured: true,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-18 11:51:46'
      },
      {
        id: 9,
        name: 'xiaomi mipad 6spro',
        description: 'Tableta Xiaomi Mi Pad 6s Pro',
        price: 499.99,
        stock: 59,
        categoryId: 2,
        imageUrl: '/images/xiaomi.png',
        isFeatured: true,
        createdAt: '2024-05-14 00:02:28',
        updatedAt: '2024-05-18 11:51:46'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

