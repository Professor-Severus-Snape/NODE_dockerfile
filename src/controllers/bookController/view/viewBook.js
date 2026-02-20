import config from '../../../config/index.js';
import Book from '../../../models/Book.js';

const { MICROSERVICE_URL } = config;

export const renderBookById = async (req, res) => {
  const { id } = req.params;
  const { increment } = req.query;

  const book = Book.getBookById(id);

  if (!book) {
    res.status(404);
    res.render('books/404', {
      layout: false,
      message: 'Книга для просмотра не найдена',
    });
    return;
  }

  // защита от накрутки - query-параметр придёт ТОЛЬКО, если был переход со страницы списка книг:
  if (increment) {
    try {
      await fetch(`${MICROSERVICE_URL}/counter/${id}/incr`, {
        method: 'POST',
      });
    } catch (err) {
      console.error('Counter service error:', err);
    }

    // убираем query-параметр, который был флагом для увеличения счетчика:
    res.redirect(`/books/${id}`);
    return;
  }

  res.render('books/view', {
    title: `Книга: ${book.title}`,
    book,
  });
};
