import express from 'express'; // подключение Express
import expressLayouts from 'express-ejs-layouts'; // чтобы не делать импорт в каждом файле .ejs
import { fileURLToPath } from 'node:url'; // преобразует URL файла в обычный путь файловой системы
import path from 'node:path'; // работа с путями

import routes from './routes/index.js'; // подключение роутов

// Создание объекта приложения:
const app = express();

// Получение __dirname в ES Modules:
const __filename = fileURLToPath(import.meta.url); // /Users/{user}/Desktop/{project}/src/app.js
const __dirname = path.dirname(__filename); // /Users/{user}/Desktop/{project}/src

// Настройка шаблонизатора EJS:
app.set('views', path.join(__dirname, 'views')); // путь к папке с представлениями
app.set('view engine', 'ejs'); // движок представлений

// Подключение express-ejs-layouts (после шаблонизатора, но до роутов):
app.use(expressLayouts);
app.set('layout', 'books/layouts/main'); // путь к main.ejs внутри views

// Middlewares уровня приложения (посл-сть: парсеры -> роуты -> маршрут не найден -> выброс ошибки):

// 1. Middleware - подключение статики (CSS-стили) из папки public:
app.use(express.static(path.join(process.cwd(), 'public')));

// 2. Middleware - JSON парсер (заголовок Content-Type: application/json):
app.use(express.json());

// 3. Middleware для формы (заголовок Content-Type: application/x-www-form-urlencoded):
app.use(express.urlencoded({ extended: true }));

// 4. Middleware - основные маршруты:
app.use('/', routes); // корневой роут -> http://localhost:{PORT}

export default app;
