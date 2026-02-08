import Book from '../classes/Book.js';

const books = Array.from(
  { length: 5 },
  (_, i) =>
    new Book({
      title: `title-${i + 1}`,
      description: `description-${i + 1}`,
      authors: `authors-${i + 1}`,
      favorite: `favorite-${i + 1}`,
      fileCover: `fileCover-${i + 1}`,
      fileName: `fileName-${i + 1}`,
      fileBook: `fileBook-${i + 1}.pdf`,
    }),
);

export default books;
