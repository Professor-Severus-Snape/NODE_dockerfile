import { sendSuccess } from '../../../utils/response.js';
import Book from '../../../models/Book.js';

// бизнес-логика - удаление книги по её id:
export const deleteBookById = (req, res, next) => {
  const { id } = req.params;
  const isRemoved = Book.removeBookById(id);

  if (!isRemoved) {
    const error = new Error('Code: 404. Книга не найдена.');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  sendSuccess(res, 200, 'Книга удалена'); // 200 - Ok
};
