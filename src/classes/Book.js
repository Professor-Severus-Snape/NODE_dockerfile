import { v4 as uuid } from 'uuid';

export default class Book {
  constructor({
    title = 'нет данных',
    description = 'нет данных',
    authors = 'нет данных',
    favorite = 'нет данных',
    fileCover = 'нет данных',
    fileName = 'нет данных',
    fileBook = 'нет данных', // имя! загруженного файла книги
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
}
