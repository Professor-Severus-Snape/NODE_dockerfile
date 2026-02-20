import { sendSuccess } from '../../../utils/response.js';
import Book from '../../../models/Book.js';

// бизнес-логика - добавление новой книги в массив:
export const addNewBook = (req, res, next) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  // если multer не загрузил файл:
  if (!req.file) {
    const error = new Error('Файл книги не загружен');
    error.status = 400;
    next(error); // передаём ошибку в errorHandler
    return;
  }

  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook: req.file.filename, // имя загруженного файла
  });

  Book.addBook(newBook);
  sendSuccess(res, 201, newBook); // 201 - Created
};
