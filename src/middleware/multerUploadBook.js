import multer from 'multer';

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    const folder = 'public/books'; // папка для загрузки файла - предварительно создать !!!
    callback(null, folder);
  },
  filename(_req, file, callback) {
    const fileName = `${Date.now()}-${file.originalname}`; // имя загружаемого файла
    callback(null, fileName);
  },
});

// проверка типа файла - разрешаем загрузку только для pdf-файлов:
const fileFilter = (_req, file, callback) => {
  if (file.mimetype === 'application/pdf') {
    callback(null, true); // разрешаем загрузку
  } else {
    callback(new Error('Разрешены только PDF-файлы'), false); // отклоняем
  }
};

// ограничение размера файла - 5 МБ:
const limits = {
  fileSize: 5 * 1024 * 1024,
};

// создание и экспорт middleware:
export default multer({ storage, fileFilter, limits }); // ключи зарезервированы!
