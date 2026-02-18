import express from 'express';
import multerUploadBook from '../../middleware/shared/multerUploadBook.js'; // middleware (multer)
import errorMulterUploadBook from '../../middleware/actions/errorMulterUploadBook.js'; // multer err
import * as bookController from '../../controllers/bookController/index.js';

const router = express.Router();

// POST -> создание книги:
router.post('/create', multerUploadBook.single('fileBook'), bookController.actions.addBook);

// GET -> скачивание книги (перед! динамическим id):
router.get('/:id/download', bookController.actions.downloadBook);

// POST (DELETE нельзя отправить через форму в HTML) -> удаление книги:
router.post('/:id/delete', bookController.actions.deleteBook);

// POST (PATCH и PUT нельзя отправить через форму в HTML) -> обновление книги:
router.post('/:id/update', bookController.actions.updateBook);

// middleware ошибок загрузки через multer:
router.use(errorMulterUploadBook);

export default router;
