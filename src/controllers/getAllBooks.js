import { sendSuccess } from '../utils/response.js';
import books from '../data/books.js';

// бизнес-логика - получение всего списка книг:
const getAllBooks = (_req, res) => {
  sendSuccess(res, 200, books); // 200 - Ok
};

export default getAllBooks;
