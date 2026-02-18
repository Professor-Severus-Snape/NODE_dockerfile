import Book from '../../../models/Book.js';

export const addBook = (req, res) => {
  const { title, description, authors, favorite } = req.body;

  // название книги - обязательно:
  if (!title.trim()) {
    res.status(400);
    res.render('books/404', {
      layout: false,
      message: 'Название книги обязательно для заполнения',
    });
    return;
  }

  // файл книги тоже обязателен:
  if (!req.file) {
    res.status(400);
    res.render('books/404', {
      layout: false,
      message: 'Файл книги не был загружен',
    });
    return;
  }

  const newBook = new Book({
    title: title.trim(),
    description: description.trim() || Book.EMPTY,
    authors: authors.trim() || Book.EMPTY,
    favorite: favorite.trim() || Book.EMPTY,
    fileBook: req.file.filename,
  });

  Book.addBook(newBook);

  res.redirect('/books');
};
