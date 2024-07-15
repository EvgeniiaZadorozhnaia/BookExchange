"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Kseniya",
          email: "kseniakrivda@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          avatarUrl: "",
          rating: 2.3,
          numberOfRating: 1,
          placeOfMeeting: "Тайланд",
          city: "Пхукет",
        },
        {
          username: "Artem",
          email: "AV011123@yandex.ru",
          password: await bcrypt.hash("admin123", 10),
          avatarUrl: "",
          rating: 5.0,
          numberOfRating: 1,
          placeOfMeeting: "УралМаш",
          city: "Екатеринбург",
        },
        {
          username: "Evgenia",
          email: "eu.skorobogatowa@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          avatarUrl: "",
          rating: 4.2,
          numberOfRating: 1,
          placeOfMeeting: "Ботанический сад",
          city: "Астана",
          isAdmin: true,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Books",
      [
        {
          ownerId: 1,
          title: "1984",
          author: "Джордж Оруэлл",
          pages: 320,
          rating: 4.8,
          numberOfRating: 1,
          pictureUrl: "1984.webp",
        },
        {
          ownerId: 1,
          title: "Автостопом по галактике",
          author: "Дуглас Адамс",
          pages: 640,
          rating: 4.6,
          numberOfRating: 1,
          pictureUrl: "Avtostopom.webp",
        },
        {
          ownerId: 1,
          title: "Бойня №5",
          author: "Курт Воннегут",
          pages: 224,
          rating: 4.2,
          numberOfRating: 1,
          pictureUrl: "Boinya.webp",
        },
        {
          ownerId: 1,
          title: "Преступление и наказание",
          author: "Фёдор Достоевский",
          pages: 672,
          rating: 5.0,
          numberOfRating: 1,
          pictureUrl: "crime.webp",
        },
        {
          ownerId: 2,
          title: "Гений",
          author: "Теодор Драйзер",
          pages: 736,
          rating: 4.0,
          numberOfRating: 1,
          pictureUrl: "Genii.webp",
        },
        {
          ownerId: 2,
          title: "Гордость и предубеждение",
          author: "Джейн Остен",
          pages: 416,
          rating: 5.0,
          numberOfRating: 1,
          pictureUrl: "Gordost.webp",
        },
        {
          ownerId: 2,
          title: "Великий Гэтсби",
          author: "Фрэнсис Скотт Фицджеральд",
          pages: 256,
          rating: 4.8,
          numberOfRating: 1,
          pictureUrl: "Great_Gatsby.webp",
        },
        {
          ownerId: 2,
          title: "О мышах и людях",
          author: "Джон Стейнбек",
          pages: 256,
          rating: 4.6,
          numberOfRating: 1,
          pictureUrl: "O_myshax.webp",
        },
        {
          ownerId: 1,
          title: "Грозовой Перевал",
          author: "Эмили Бронте",
          pages: 384,
          rating: 5.0,
          numberOfRating: 1,
          pictureUrl: "Pereval.webp",
        },
        {
          ownerId: 2,
          title: "Ромео и Джульетта",
          author: "Уильям Шекспир",
          pages: 192,
          rating: 4.5,
          numberOfRating: 1,
          pictureUrl: "Romeo.webp",
        },
        {
          ownerId: 1,
          title: "Скотный двор",
          author: "Джордж Оруэлл",
          pages: 160,
          rating: 4.2,
          numberOfRating: 1,
          pictureUrl: "Skotny_dvor.webp",
        },
        {
          ownerId: 2,
          title: "Убить пересмешника",
          author: "Харпер Ли",
          pages: 416,
          rating: 3.9,
          numberOfRating: 1,
          pictureUrl: "Ubit_peresmeshnika.webp",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          bookId: 2,
          content: "Очень хорошая книга, читала прошлым летом",
          likes: 5,
          dislikes: 0,
        },
        {
          userId: 2,
          bookId: 8,
          content: "Крутая книга, очень интересный сюжет",
          likes: 10,
          dislikes: 2,
        },
        {
          userId: 2,
          bookId: 4,
          content:
            "Переоцененная книга, на мой взгляд рейтинг должен быть намного ниже",
          likes: 0,
          dislikes: 8,
        },
        {
          userId: 1,
          bookId: 2,
          content: "Не знаю, по-моему так себе",
          likes: 3,
          dislikes: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.bulkDelete("Books", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
