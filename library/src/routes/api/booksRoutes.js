import express from 'express';
import multerUploadBook from '../../middleware/shared/multerUploadBook.js'; // middleware (multer)
import errorMulterUploadBook from '../../middleware/api/errorMulterUploadBook.js'; // multer err
import * as bookController from '../../controllers/bookController/index.js'; // конечные обработчики

const router = express.Router();

// Middlewares уровня маршрутизации:

// 1. GET -> http://localhost:{PORT}/api/books/{id}/download
// самый специфичный путь — должен стоять первым, чтобы '/:id' его не перекрыл:
router.get('/:id/download', bookController.api.downloadBookById); // скачивание книги

// 2. GET, POST -> http://localhost:{PORT}/api/books
// путь ко всей коллекции — не конфликтует с другими - может стоять где угодно:
router
  .route('/')
  .get(bookController.api.getAllBooks) // получение всего списка книг
  .post(multerUploadBook.single('fileBook'), bookController.api.addNewBook); // создание новой книги

// 3. GET, PUT, DELETE -> http://localhost:{PORT}/api/books/{id}
// общий путь к одному элементу — идёт последним:
router
  .route('/:id')
  .get(bookController.api.getBookById) // получение книги по её id
  .put(multerUploadBook.single('fileBook'), bookController.api.updateBookById) // изменение книги
  .delete(bookController.api.deleteBookById); // удаление книги по её id

// middleware ошибок загрузки через multer:
router.use(errorMulterUploadBook);

export default router;
