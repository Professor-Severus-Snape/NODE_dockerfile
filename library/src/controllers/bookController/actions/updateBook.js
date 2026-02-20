import Book from '../../../models/Book.js';

export const updateBook = (req, res) => {
  const { id } = req.params;

  const bookToUpdate = Book.getBookById(id);

  if (!bookToUpdate) {
    res.status(404);
    res.render('books/404', {
      layout: false,
      message: 'Книга для обновления не найдена',
    });
    return;
  }

  // объект с полями, которые нужно обновить:
  const newData = { ...req.body };

  // если multer загрузил файл — обновляем fileBook
  if (req.file) {
    newData.fileBook = req.file.filename;
  }

  // обновляем данные книги:
  const updatedBook = Book.updateBook(id, newData);

  if (!updatedBook) {
    res.status(500);
    res.render('books/404', {
      layout: false,
      message: 'Не удалось обновить книгу',
    });
    return;
  }

  // считываем value из скрытого input[name="redirectTo"]:
  const redirectTo = req.body.redirectTo || '/books';
  res.redirect(redirectTo); // редирект на переданный URL
};
