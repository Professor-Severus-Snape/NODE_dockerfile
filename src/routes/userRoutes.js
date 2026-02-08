import express from 'express';
import loginUser from '../controllers/loginUser.js'; // конечный обработчик с бизнес-логикой

const router = express.Router();

// Middleware уровня маршрутизации:
router.post('/login', loginUser); // авторизации пользователя

export default router;
