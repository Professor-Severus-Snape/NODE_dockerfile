import { sendError } from '../utils/response.js';

// middleware для обработки некорректных роутов (искусственный вызов ошибки):
export default function error404(_req, res) {
  sendError(res, 404, 'Маршрут не найден');
}
