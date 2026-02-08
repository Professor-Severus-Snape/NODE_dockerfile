import { sendError } from '../utils/response.js';

// middleware для централизованной обработки ошибок:
export default function errorHandler(err, _req, res, _next) {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  sendError(res, status, message);
}

// NOTE: сработает при:
// 1. throw new Error('Что-то пошло не так...'); // проброс ошибки
// 2. next(err); // 'ручная' передача ошибки
