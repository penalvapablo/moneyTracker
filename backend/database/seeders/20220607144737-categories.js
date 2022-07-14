'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Food',
        typeId: 2,
        userId: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Job',
        typeId: 1,
        userId: 1,
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
