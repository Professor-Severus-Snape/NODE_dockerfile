import path from 'node:path';
import fsPromises from 'node:fs/promises';
import Book from '../../../models/Book.js';

export const downloadBookById = async(req, res, next) => {
  const { id } = req.params;
  const book = Book.getBookById(id);

  if (!book) {
    const error = new Error('Code: 404. Книга для скачивания не найдена');
    error.status = 404;
    next(error);
    return;
  }

  const { fileBook } = book;

  // формируем абсолютный путь к файлу книги - process.cwd() вернёт абс. путь до корня проекта:
  const filePath = path.join(process.cwd(), 'public', 'books', fileBook);

  try {
    await fsPromises.access(filePath); // проверяем, что файл книги существует
  } catch {
    const error = new Error('Code: 404. Файл книги не найден.');
    error.status = 404;
    next(error);
    return;
  }

  // если файл есть, то отправляем его на скачивание:
  res.download(filePath, fileBook, (error) => {
    if (error) {
      error.status = 500;
      next(error);
    }
  });

  // NB! вызов res.json() после скачивания вызовет "Error: Can't set headers after they are sent."
};
