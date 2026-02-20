export const renderCreateBook = (_req, res) => {
  res.render('books/create', {
    title: 'Добавить книгу',
  });
};
