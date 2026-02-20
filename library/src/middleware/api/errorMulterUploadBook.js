import multer from 'multer';

// middleware для обработки ошибок загрузки файла книги:
export default function errorMulterUploadBook(err, _req, _res, next) {
  // 1. превышение допустимого размера файла:
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      err.message = 'Размер файла превышает максимально допустимый (5 МБ)';
    }
    err.status = 400; // 400 - Bad Request (некорректные данные)
    next(err); // передаём ошибку в errorHandler
    return;
  }

  // 2. загрузка недопустимого типа файла (можно только pdf):
  if (err.message && err.message.includes('PDF')) {
    err.status = 400;
    next(err);
    return;
  }

  next(err); // 'ручная' передача ошибки в middleware 'errorHandler', если она не от Multer
}
