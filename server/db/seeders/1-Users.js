"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Иван",
          email: "qwe@qwe.qwe",
          password:
            "$2b$10$Su526nfL/UNhu5lCWInAJ.o0mUUpERYM6YxPxJmk77ZwxRqiRMz.y",
          score: 500,
        },
        {
          username: "Андрей",
          email: "1@1",
          password:
            "$2b$10$WVs8fPAheiyRUMGp1HXkoe9AwZ9GYqkPNw/ekfxDmVG5k3ekwdowu",
          score: 1200,
        },
        {
          username: "spyder",
          email: "spyder@spyder.spyder",
          password:
            "$2b$10$yrZyQ3ym.FdyNfLD2bTYn./gutBJx48.2zryzBiUipfXjvVG6woea",
          score: 5800,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
