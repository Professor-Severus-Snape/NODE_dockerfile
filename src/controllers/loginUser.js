import { sendSuccess } from '../utils/response.js';
import users from '../data/users.js';

// бизнес-логика - авторизация пользователя:
const loginUser = (req, res, next) => {
  const { mail } = req.body;

  if (!mail) {
    const error = new Error('Поле "mail" обязательно');
    error.status = 400; // 400 - Bad Request (некорректные данные)
    next(error); // передаём ошибку в errorHandler
    return;
  }

  const user = users.find((user) => user.mail === mail);

  if (!user) {
    const error = new Error('Code: 404. Пользователь с таким email не найден');
    error.status = 404; // 404 - Not Found
    next(error); // передаём ошибку в errorHandler
    return;
  }

  sendSuccess(res, 201, user); // 201 - Created - { success: true, data: { id: 1, mail: '...' } }
};

export default loginUser;
