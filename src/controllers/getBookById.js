import { sendSuccess } from '../utils/response.js';
import books from '../data/books.js';

// бизнес-логика - получение книги по её id:
const getBookById = (req, res, next) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    const error = new Error('Code: 404. Книга не найдена.');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  sendSuccess(res, 200, book); // 200 - Ok
};

export default getBookById;
