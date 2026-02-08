import express from 'express';
import booksRoutes from './booksRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// 1. GET -> http://localhost:3000/api
router.get('/', (_req, res) => {
  res.json({
    message: "Сервер работает! Используй '/books' или '/user'",
  });
});

// 2. GET, POST, PUT, DELETE -> http://localhost:3000/api/books, http://localhost:3000/api/books{id}
router.use('/books', booksRoutes);

// 3. POST -> http://localhost:3000/api/user/login
router.use('/user', userRoutes);

export default router;
