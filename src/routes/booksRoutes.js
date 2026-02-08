import express from 'express';
import addNewBook from '../controllers/addNewBook.js'; // конечный обработчик
import deleteBookById from '../controllers/deleteBookById.js'; // конечный обработчик
import getAllBooks from '../controllers/getAllBooks.js'; // конечный обработчик
import getBookById from '../controllers/getBookById.js'; // конечный обработчик
import updateBookById from '../controllers/updateBookById.js'; // конечный обработчик
import multerUploadBook from '../middleware/multerUploadBook.js'; // middleware (multer - загрузка)
import downloadBookById from '../controllers/downloadBookById.js'; // конечный обработчик (скачать)

const router = express.Router();

// Middlewares уровня маршрутизации:
router.get('/', getAllBooks); // получение всего списка книг
router.get('/:id/download', downloadBookById); // скачивание книги (размещаем роут ПЕРЕД `/:id`)
router.get('/:id', getBookById); // получение книги по её id
router.post('/', multerUploadBook.single('fileBook'), addNewBook); // создание новой книги
router.put('/:id', multerUploadBook.single('fileBook'), updateBookById); // изменение данных книги
router.delete('/:id', deleteBookById); // удаление книги по её id

export default router;
