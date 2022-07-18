'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movements', [
      {
        typeId: 2,
        categoryId: 1,
        concept: 'chicken',
        amount: 1000,
        date: new Date,
        userId: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        typeId: 1,
        categoryId: 1,
        concept: 'july',
        amount: 100000,
        date: new Date,
        userId: 1,
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
