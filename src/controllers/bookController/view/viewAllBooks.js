import Book from '../../../models/Book.js';

export const renderAllBooks = (_req, res) => {
  const books = Book.getAllBooks();

  res.render('books/index', {
    title: 'Все книги',
    books,
  });
};
