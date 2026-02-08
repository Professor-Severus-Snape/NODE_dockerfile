import { sendSuccess } from '../utils/response.js';
import books from '../data/books.js';

// бизнес-логика - изменение данных о книге по её id:
const updateBookById = (req, res, next) => {
  const { id } = req.params;
  const bookToUpdate = books.find((book) => book.id === id);

  if (!bookToUpdate) {
    const error = new Error('Code: 404. Книга не найдена.');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  const bookProperties = [
    'title',
    'description',
    'authors',
    'favorite',
    'fileCover',
    'fileName',
  ];

  bookProperties.forEach((property) => {
    if (property in req.body) {
      bookToUpdate[property] = req.body[property];
    }
  });

  // если multer загрузил новый файл книги, то обновляем свойство fileBook:
  if (req.file) {
    bookToUpdate.fileBook = req.file.filename;
  }

  sendSuccess(res, 200, bookToUpdate); // 200 - Ok
};

export default updateBookById;
