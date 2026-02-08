import { v4 as uuid } from 'uuid';

export default class User {
  constructor(mail) {
    this.id = uuid();
    this.mail = mail;
  }
}
