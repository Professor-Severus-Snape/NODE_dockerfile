import { sendSuccess } from '../../../utils/response.js';
import Book from '../../../models/Book.js';

// бизнес-логика - получение книги по её id:
export const getBookById = (req, res, next) => {
  const { id } = req.params;
  const book = Book.getBookById(id);

  if (!book) {
    const error = new Error('Code: 404. Книга не найдена.');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  sendSuccess(res, 200, book); // 200 - Ok
};
