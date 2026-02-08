import { sendSuccess } from '../utils/response.js';
import books from '../data/books.js';

// бизнес-логика - удаление книги по её id:
const deleteBookById = (req, res, next) => {
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx === -1) {
    const error = new Error('Code: 404. Книга не найдена.');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  books.splice(idx, 1);
  sendSuccess(res, 200, 'Книга удалена'); // 200 - Ok
};

export default deleteBookById;
