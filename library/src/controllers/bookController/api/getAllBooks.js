import { sendSuccess } from '../../../utils/response.js';
import Book from '../../../models/Book.js';

// бизнес-логика - получение всего списка книг:
export const getAllBooks = (_req, res) => {
  const books = Book.getAllBooks();
  sendSuccess(res, 200, books); // 200 - Ok
};
