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
          rating: 5.0,
          placeOfMeeting: "Тайланд",
          city: "Пхукет",
        },
        {
          username: "Artem",
          email: "AV011123@yandex.ru",
          password: await bcrypt.hash("admin123", 10),
          avatarUrl: "",
          rating: 5.0,
          placeOfMeeting: "УралМаш",
          city: "Екатеринбург",
        },
        {
          username: "Evgenia",
          email: "eu.skorobogatowa@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          avatarUrl: "",
          rating: 5.0,
          placeOfMeeting: "Ботанический сад",
          city: "Астана",
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
          pictureUrl: "1984.webp",
        },
        {
          ownerId: 1,
          title: "Автостопом по галактике",
          author: "Дуглас Адамс",
          pages: 640,
          rating: 4.6,
          pictureUrl: "Avtostopom.webp",
        },
        {
          ownerId: 1,
          title: "Бойня №5",
          author: "Курт Воннегут",
          pages: 224,
          rating: 4.2,
          pictureUrl: "Boinya.webp",
        },
        {
          ownerId: 1,
          title: "Преступление и наказание",
          author: "Фёдор Достоевский",
          pages: 672,
          rating: 5.0,
          pictureUrl: "crime.webp",
        },
        {
          ownerId: 2,
          title: "Гений",
          author: "Теодор Драйзер",
          pages: 736,
          rating: 4.0,
          pictureUrl: "Genii.webp",
        },
        {
          ownerId: 2,
          title: "Гордость и предубеждение",
          author: "Джейн Остен",
          pages: 416,
          rating: 5.0,
          pictureUrl: "Gordost.webp",
        },
        {
          ownerId: 2,
          title: "Великий Гэтсби",
          author: "Фрэнсис Скотт Фицджеральд",
          pages: 256,
          rating: 4.8,
          pictureUrl: "Great_Gatsby.webp",
        },
        {
          ownerId: 2,
          title: "О мышах и людях",
          author: "Джон Стейнбек",
          pages: 256,
          rating: 4.6,
          pictureUrl: "O_myshax.webp",
        },
        {
          ownerId: 3,
          title: "Грозовой Перевал",
          author: "Эмили Бронте",
          pages: 384,
          rating: 5.0,
          pictureUrl: "Pereval.webp",
        },
        {
          ownerId: 3,
          title: "Ромео и Джульетта",
          author: "Уильям Шекспир",
          pages: 192,
          rating: 4.5,
          pictureUrl: "Romeo.webp",
        },
        {
          ownerId: 3,
          title: "Скотный двор",
          author: "Джордж Оруэлл",
          pages: 160,
          rating: 4.2,
          pictureUrl: "Skotny_dvor.webp",
        },
        {
          ownerId: 3,
          title: "Убить пересмешника",
          author: "Харпер Ли",
          pages: 416,
          rating: 3.9,
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
          content: "Переоцененная книга, на мой взгляд рейтинг должен быть намного ниже",
          likes: 0,
          dislikes: 8,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Exchanges",
      [
        {
          fromUser: 1,
          fromBook: 1,
          toUser: 2,
          toBook: 5,
          status: 'pending',
        },
        {
          fromUser: 1,
          fromBook: 3,
          toUser: 3,
          toBook: 11,
          status: 'pending',
        },
        {
          fromUser: 2,
          fromBook: 6,
          toUser: 3,
          toBook: 12,
          status: 'processing',
        },
        {
          fromUser: 2,
          fromBook: 6,
          toUser: 1,
          toBook: 12,
          status: 'processing',
        },
        {
          fromUser: 3,
          fromBook: 5,
          toUser: 1,
          toBook: 10,
          status: 'processing',
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Favorites",
      [
        {
          userId: 1,
          bookId: 5,
        },
        {
          userId: 1,
          bookId: 6,
        },
        {
          userId: 2,
          bookId: 1,
        },
        {
          userId: 2,
          bookId: 10,
        },
        {
          userId: 3,
          bookId: 4,
        },
        {
          userId: 3,
          bookId: 2,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Messages",
      [
        {
          text: "Привет. Хочу забрать твою книгу!",
          authorId: 1,
          toUser: 2,
          exchangeId: 4
        },
        {
          text: "Поскорее!",
          authorId: 1,
          toUser: 2,
          exchangeId: 4
        },
        {
          text: "Добрый вечер! Забираю Вашу книгу!",
          authorId: 1,
          toUser: 3,
          exchangeId: 5
        },
        {
          text: "Привет! Забираю!",
          authorId: 2,
          toUser: 1,
          exchangeId: 1
        },
        {
          text: "Добрый вечер! I need this book!",
          authorId: 3,
          toUser: 1,
          exchangeId: 2
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Messages", null, {});
    await queryInterface.bulkDelete("Favorites", null, {});
    await queryInterface.bulkDelete("Exchanges", null, {});
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.bulkDelete("Books", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
