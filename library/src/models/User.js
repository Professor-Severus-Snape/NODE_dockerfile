import { v4 as uuid } from 'uuid';

export default class User {
  constructor(mail) {
    this.id = uuid();
    this.mail = mail;
  }

  // приватное хранилище пользователей - сразу добавляем mock-данные:
  static #users = [
    { id: '1', mail: 'test@mail.ru' },
    new User('demo@gmail.com'),
    new User('alex@gmail.com'),
    new User('denis@gmail.com'),
    new User('inkognito@gmail.com'),
  ];

  static getUserByEmail(mail) {
    return this.#users.find((user) => user.mail === mail);
  }
}
