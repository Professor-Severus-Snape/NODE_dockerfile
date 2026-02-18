import { v4 as uuid } from 'uuid';

export default class Book {
  static EMPTY = 'нет данных';

  constructor({
    title = Book.EMPTY,
    description = Book.EMPTY,
    authors = Book.EMPTY,
    favorite = Book.EMPTY,
    fileCover = Book.EMPTY,
    fileName = Book.EMPTY,
    fileBook = Book.EMPTY, // имя! загруженного файла книги
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }

  // приватное хранилище книг - сразу добавляем mock-данные:
  static #books = Array.from(
    { length: 5 },
    (_, i) =>
      new Book({
        title: `Книга #${i + 1}`,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
          'Delectus modi similique eum reiciendis eaque! Aut, debitis? ' +
          'Vel vero fugit impedit nobis incidunt, facilis minus, voluptas ullam illo quod totam.',
        authors: `автор #${i + 1}`,
        favorite: `закладка #${i + 1}`,
        fileCover: `обложка #${i + 1}`,
        fileName: `имя файла #${i + 1}`,
        fileBook: 'test.pdf',
      }),
  );

  static getAllBooks() {
    return [...this.#books]; // возвращаем копию! массива (в целях безопасности)
  }

  static getBookById(id) {
    return this.#books.find((book) => book.id === id);
  }

  static addBook(book) {
    this.#books.push(book);
  }

  static removeBookById(id) {
    const idx = this.#books.findIndex((book) => book.id === id);

    if (idx !== -1) {
      this.#books.splice(idx, 1);
      return true;
    }

    return false;
  }

  static updateBook(id, newData) {
    const bookToUpdate = this.getBookById(id);
    if (!bookToUpdate) return null;

    const bookProperties = [
      'title',
      'description',
      'authors',
      'favorite',
      'fileCover',
      'fileName',
      'fileBook',
    ];

    // обновляем только существующие поля:
    bookProperties.forEach((property) => {
      if (property in newData) {
        const newValue = newData[property].trim();

        bookToUpdate[property] =
          property === 'title'
            ? newValue || bookToUpdate.title
            : newValue || Book.EMPTY;
      }
    });

    return bookToUpdate;
  }
}
