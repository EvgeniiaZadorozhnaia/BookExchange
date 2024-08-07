# Название проекта

BookExchange

# Описание проекта

Платформа для обмена бумажными книгами между людьми. Fullstack приложение с подключенной базой данных.

# Стек

JavaScript, TypeScript, React, ReduxToolkit, Chakra UI, GoogleBooks, OpenWeather, Git, Node.js, PostgreSQL, Express, Sequelize, bcrypt, cookie-parser, cors, dotenv, jsonwebtoken, morgan, nodemon, multer, drag and drop, nodemailer, Vite

# Скриншоты проекта BookExchange

## Страница входа и регистрации

![Страница входа и регистрации](images/Screenshot%202024-08-07%20133201.png)
![Страница входа и регистрации](images/Screenshot%202024-08-07%20133210.png)

Форма для регистрации пользователя, если он еще не зарегистрирован, либо для входа, если пользователь уже есть в базе данных. При регистрации можно загрузить аватар с помощью перетаскивания фотографии.

![Страница входа и регистрации](images/Screenshot%202024-08-07%20133447.png)

Если пользователь при входе введет некорректные данные, сайт сообщит ему об этом.

---

## Главная страница

![Главная страница](./images/Screenshot%202024-08-07%20133254.png)

После регистрации или входа пользователь попадает на главную страницу, в левом нижнем углу страницы всплывает уведомление о том, что письмо о регистрации отправлено на электронную почту. На странице присутствуют анимации.

![Главная страница](./images/Screenshot%202024-08-07%20135250.png)

На главной странице отображаются все книги, доступные для обмена, а также поля для поиска книг, можно искать книги по ключевым словам, либо по городу проживания, либо комбинировать запросы (ключевые слова + город)

---

## Мои книги

![Мои книги](images/Screenshot%202024-08-07%20133521.png)

Страница с книгами пользователя, выставленными на обмен, эти книги пользователь видит только на этой странице, на главной собственные книги не отображаются, только книги других пользователей. Здесь можно добавить новую книгу, удалить старую, либо редактировать ее. Действия по редактированию / добавлению происходят в модальном окне, при добавлении изображения обложки также можно воспользоваться перетаскиванием изображения, либо просто выбрать файл. На странице реализованы анимации.

![Мои книги](images/Screenshot%202024-08-07%20133535.png)

---

## Избранное

![Избранное](images/Screenshot%202024-08-07%20133603.png)

На этой странице отображаются книги, которые пользователь добавил в избранное. Можно удалять книги из избранного, реализован слайдер для перелистывания книг, также на странице присутствуют анимации.


## Подробная информация о книге

![Подробная информация о книге](images/Screenshot%202024-08-07%20133624.png)

Здесь в левой части страницы отображается обложка книги, ее владелец, кнопка с предложением об обмене, можно добавить книгу в избранное, либо вернуться назад. В правой части сверху расположен блок с подробной информацией о книге (название, автор, количество страниц, рейтинг и описание книги, которое подтягивается с API GoogleBooks) и ниже блок с отзывами на книгу, здесь можно ставить лайк или дизлайк отзыву, добавлять / удалять свои отзывы (их лайкать нельзя), также можно поставить рейтинг книге, это сразу отобразится на странице и сохранится в базе данных. На странице присутствуют анимации.

---

## Страница обмена

![Страница обмена](images/Screenshot%202024-08-07%20133638.png)

На этой странице отображается информация о владельце, его рейтинг, город проживания, место, где ему удобно проводить обмен, можно поставить пользователю оценку (если между вами уже был обмен). Вы можете выбрать книги, которые хотите обменять и отправить предложение. Выводится уведомление о том, что предложение отправлено и предлагается написать пользователю, которому вы предложили обмен.

---

## Личный кабинет / чат

![Личный кабинет / чат](images/Screenshot%202024-08-07%20133656.png)

На эту страницу можно попасть либо кликнув на свое имя в шапке сайта, либо при нажатии на кнопку "написать пользователю" на странице обмена. 

Здесь слева чат с пользователями, с которыми вы взаимодействуете (планируете / проводите) обмены книгами. Вы можете обмениваться с ними сообщениями, договариваться об удобном времени для встречи и обсуждать детали. Справа прогноз погоды (чтобы выбрать оптимальное время для встречи, погода отображается в зависимости от города, указанного при регистрации)  и календарь, где вы можете оставлять / удалять заметки о встречах, чтобы ничего не забыть. Также на этой странице присутствует кнопка "История обменов", при нажатии на которую всплывает окно с вашей историей.

---

## История обменов

![История обменов](images/Screenshot%202024-08-07%20133708.png)

В этом окне вы видите все текущие обмены (входящие, отправленные, активные) и можете ими управлять, отменять, подтверждать, смотреть статус. Все это также связано с базой данных. При положительном завершении обмена книги, участвующие в обмене пропадают из базы данных и больше не отображаются на сайте (не доступны для обмена).

---

## Личный кабинет админа

![Личный кабинет админа](images/Screenshot%202024-08-07%20134736.png)

В приложении реализован функционал по администрированию. В личном кабинете админ видит всех пользователей, зарегистрированных на сайте. Может смотреть подробную информацию о каждом, а также блокировать их. При нажатии на кнопку "подробнее" выплывет модальное окно.

---

## Подробная информация о пользователе
![Подробная информация о пользователе](images/Screenshot%202024-08-07%20134758.png)

В модальном окне администратор увидит подробную информацию о пользователе: имя, электронную почту, рейтинг, общее количество лайков, дизлайков, комментариев, дату регистрации, а также все отзывы, которые оставлял пользователь, на основании чего администратор может принять решение о блокировании. И если вдруг заблокированный пользователь решит зайти на сайт, он увидит следующее

![Подробная информация о пользователе](images/Screenshot%202024-08-07%20134821.png)

## База данных
![База данных](images/Screenshot%202024-07-17%20155409.png)

На этой картинке показана схема базы данных, которая реализована в данном проекте.
