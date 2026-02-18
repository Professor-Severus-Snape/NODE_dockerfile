import multer from 'multer';

export default function errorMulterUploadBook(err, _req, res, next) {
  // вызвана ли ошибка загрузки файла multer-ом:
  const isMulterError =
    err instanceof multer.MulterError ||
    (err.message && err.message.includes('PDF'));

  // если ошибка не вызвана multer, то передаём в следующий перехватчик ошибок:
  if (!isMulterError) {
    return next(err);
  }

  let message = 'Ошибка загрузки файла';

  // ошибки multer:
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Размер файла слишком большой';
    } else {
      message = 'Ошибка загрузки файла';
    }
  }

  // попытка загрузить не PDF:
  if (err.message && err.message.includes('PDF')) {
    message = 'Разрешены только PDF-файлы';
  }

  res.status(400);
  res.render('books/404', {
    layout: false,
    message,
  });
}
