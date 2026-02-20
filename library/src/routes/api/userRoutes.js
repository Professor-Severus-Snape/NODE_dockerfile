import express from 'express';
import * as userController from '../../controllers/userController/index.js'; // конечные обработчики

const router = express.Router();

// Middleware уровня маршрутизации:

// 1. POST -> http://localhost:{PORT}/api/user/login
router.post('/login', userController.api.loginUser); // авторизация пользователя

export default router;
