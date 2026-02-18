import path from 'node:path';
import fsPromises from 'node:fs/promises';
import Book from '../../../models/Book.js';

export const downloadBook = async(req, res) => {
  const { id } = req.params;
  const book = Book.getBookById(id);

  if (!book) {
    res.status(404);
    res.render('books/404', {
      layout: false, // отключаем дефолтный layout для ошибок
      message: 'Книга для скачивания не найдена',
    });

    return;
  }

  const { fileBook } = book;

  // формируем абсолютный путь к файлу книги - process.cwd() вернёт абс. путь до корня проекта:
  const filePath = path.join(process.cwd(), 'public', 'books', fileBook);

  try {
    await fsPromises.access(filePath); // проверяем, что файл книги существует
  } catch {
    res.status(404);
    res.render('books/404', {
      layout: false, // отключаем дефолтный layout для ошибок
      message: 'Файл книги для скачивания не найден',
    });
    return;
  }

  // если файл есть, то отправляем его на скачивание:
  res.download(filePath, fileBook, (error) => {
    if (error) {
      res.status(500);
      res.render('books/404', {
        layout: false, // отключаем дефолтный layout для ошибок
        message: 'Не удалось скачать файл книги',
      });
      return;
    }
  });
};
