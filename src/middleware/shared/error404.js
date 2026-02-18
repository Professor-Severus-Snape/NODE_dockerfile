// общий middleware для обработки некорректных роутов для слоёв actions и view:
export default function error404(_req, res) {
  res.status(404);
  res.render('books/404', {
    layout: false,
    message: 'Маршрут не найден',
  });
}
