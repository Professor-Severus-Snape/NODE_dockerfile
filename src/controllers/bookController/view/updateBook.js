import Book from '../../../models/Book.js';

export const renderUpdateBook = (req, res) => {
  const { id } = req.params;
  const book = Book.getBookById(id);

  if (!book) {
    res.status(404);
    res.render('books/404', {
      layout: false,
      message: 'Книга не найдена',
    });
    return;
  }

  // создаём копию книги для отображения в форме:
  const bookCopy = { ...book };

  Object.keys(bookCopy).forEach((key) => {
    if (bookCopy[key] === Book.EMPTY) {
      bookCopy[key] = '';
    }
  });

  res.render('books/update', {
    title: `Редактировать книгу: ${book.title}`,
    book: bookCopy,
    currentUrl: req.get('Referer') || '/books', // передаём текущий url для возврата на него
  });
};
