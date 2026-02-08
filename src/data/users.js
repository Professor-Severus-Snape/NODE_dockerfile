import User from '../classes/User.js';

const users = [
  { id: 1, mail: 'test@mail.ru' },
  new User('demo@gmail.com'),
  new User('alex@gmail.com'),
  new User('denis@gmail.com'),
  new User('inkognito@gmail.com'),
];

export default users;
