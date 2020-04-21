import { optionsOf } from '../utils';

const upBooks = (books, index, book) => [
  ...books.slice(0, index), { ...book }, ...books.slice(index + 1)
];

const unsetAllAsAdded = booksState => {
  let { books, cache } = booksState;
  books = books.map(book => ({ ...book, isInCart: false }));
  cache = cache.map(book => ({ ...book, isInCart: false }));
  return { ...booksState, books, cache }
}

const toggleAsAdded = (booksState, id, value) => {
  let { books, cache } = booksState;

  const { index, element: book } = optionsOf(books, id);
  const { index: indexInCache, element: bookInCache } = optionsOf(cache, id);

  const newBook = { ...book, isInCart: value };
  const newBookInCache = { ...bookInCache, isInCart: value };
  books = upBooks(books, index, newBook);
  cache = upBooks(cache, indexInCache, newBookInCache);
  return { ...booksState, books, cache }
}

export { unsetAllAsAdded, toggleAsAdded };