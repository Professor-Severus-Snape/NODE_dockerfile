// middleware для централизованной обработки ошибок для слоёв actions и view:
export default function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  res.status(status);
  res.render('books/404', {
    layout: false,
    message,
  });
}
