import config from '../../../config/index.js';
import Book from '../../../models/Book.js';

const { MICROSERVICE_URL } = config;

export const renderAllBooks = async (_req, res) => {
  const books = Book.getAllBooks();

  // получаем количество просмотров каждой книги, если ошибка - вернём 0 просмотров:
  const booksWithViews = await Promise.all(
    books.map(async (book) => {
      try {
        const response = await fetch(`${MICROSERVICE_URL}/counter/${book.id}`);

        if (!response.ok) {
          throw new Error('Ошибка микросервиса!');
        }

        const data = await response.json();
        const views = data.views ?? 0;
        return { ...book, views };
      } catch (err) {
        console.error(
          `Ошибка получения количества просмотров книги с id=${book.id}:`,
          err,
        );
        return { ...book, views: 0 };
      }
    }),
  );

  res.render('books/index', {
    title: 'Все книги',
    books: booksWithViews,
  });
};
