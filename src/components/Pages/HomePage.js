import React from 'react';
import BookList from '../BookList';

const HomePage = () => <div>
  <BookList books={[
    { id: 1, title: 'The Old Man and the Sea', author: 'Ernest Hemmingway', picture: '' },
    { id: 2, title: 'Treasure Island', author: 'Robert Louis Stevenson' },
  ]} />
</div>

export default HomePage;