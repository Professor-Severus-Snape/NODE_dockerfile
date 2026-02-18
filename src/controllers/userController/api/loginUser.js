import { sendSuccess } from '../../../utils/response.js';
import User from '../../../models/User.js';

// бизнес-логика - авторизация пользователя:
export const loginUser = (req, res, next) => {
  const { mail } = req.body;

  if (!mail) {
    const error = new Error('Поле "mail" обязательно');
    error.status = 400; // 400 - Bad Request (некорректные данные)
    next(error); // передаём ошибку в errorHandler
    return;
  }

  const user = User.getUserByEmail(mail);

  if (!user) {
    const error = new Error('Code: 404. Пользователь с таким email не найден');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  sendSuccess(res, 201, user); // 201 - Created - { success: true, data: { id: '1', mail: '...' } }
};
