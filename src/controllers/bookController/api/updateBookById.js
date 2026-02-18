import { sendSuccess } from '../../../utils/response.js';
import Book from '../../../models/Book.js';

// бизнес-логика - изменение данных о книге по её id:
export const updateBookById = (req, res, next) => {
  const { id } = req.params;

  // объект с полями, которые нужно обновить:
  const newData = { ...req.body };

  // если multer загрузил новый файл книги, то обновляем свойство fileBook:
  if (req.file) {
    newData.fileBook = req.file.filename;
  }

  // обновляем данные книги:
  const updatedBook = Book.updateBook(id, newData);

  if (!updatedBook) {
    const error = new Error('Code: 404. Книга не найдена.');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  sendSuccess(res, 200, updatedBook); // 200 - Ok
};
