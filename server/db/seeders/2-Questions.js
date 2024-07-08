'use strict';
const fs = require('fs').promises;
const { EOL} = require('os')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const entries = [];
    const text = await fs.readFile('./db/src/questions.txt', 'utf-8');
    const arrayWords = text.split(EOL).forEach((str, index) => {
      const entry = str.split('-').map((el) => el.trim());
      const obj = {};
      // obj.topic = index + 1;
      obj.topic = entry[0];
      obj.price = Number(entry[1]);
      obj.question = entry[2];
      obj.answer = entry[3];
      entries.push(obj);
    });
    await queryInterface.bulkInsert('Questions', entries, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
