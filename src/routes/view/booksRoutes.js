import express from 'express';
import * as bookController from '../../controllers/bookController/index.js';

const router = express.Router();

// GET -> форма создания книги:
router.get('/create', bookController.view.renderCreateBook);

// GET -> форма редактирования книги:
router.get('/:id/update', bookController.view.renderUpdateBook);

// GET -> просмотр одной книги:
router.get('/:id', bookController.view.renderBookById);

// GET -> список всех книг:
router.get('/', bookController.view.renderAllBooks);

export default router;
