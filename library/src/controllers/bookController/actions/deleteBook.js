import Book from '../../../models/Book.js';

export const deleteBook = (req, res) => {
  const { id } = req.params;

  const removed = Book.removeBookById(id);

  if (!removed) {
    res.status(404);
    res.render('books/404', {
      layout: false, // отключаем дефолтный layout для ошибок
      message: 'Книга для удаления не найдена',
    });
    return;
  }

  res.redirect('/books');
};
