import { optionsOf } from '../utils';

const upBooks = (books, index, book) => [
  ...books.slice(0, index), book, ...books.slice(index + 1)
];

const toggleAsAdded = (booksState, id, books, value) => {
  const { index, element: book } = optionsOf(books, id);
  const newBook = { ...book, isInCart: value };
  return {
    ...booksState,
    books: upBooks(books, index, newBook)
  }
}

export default toggleAsAdded;