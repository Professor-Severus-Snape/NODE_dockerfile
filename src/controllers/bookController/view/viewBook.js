import Book from '../../../models/Book.js';

export const renderBookById = (req, res) => {
  const { id } = req.params;
  const book = Book.getBookById(id);

  if (!book) {
    res.status(404);
    res.render('books/404', {
      layout: false,
      message: 'Книга для просмотра не найдена',
    });
    return;
  }

  res.render('books/view', {
    title: `Книга: ${book.title}`,
    book,
  });
};
