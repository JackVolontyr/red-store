export default class BookstoreService {
  _data = [{
    id: 1,
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemmingway',
    price: 43,
    currency: '$',
    countInStore: 1,
    cover: 'https://book-ye.com.ua/upload/iblock/277/99c35223_35ba_11e8_80f0_000c29ae1566_ee9e5d79_35ba_11e8_80f0_000c29ae1566.jpg',
  }, {
    id: 2,
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    price: 50,
    currency: '$',
    countInStore: 2,
    cover: 'https://images-na.ssl-images-amazon.com/images/I/910CGpvNnkL.jpg'
  }, {
    id: 3,
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    price: 37,
    currency: '$',
    countInStore: 3,
    cover: 'https://images-na.ssl-images-amazon.com/images/I/414p0x7KV%2BL.jpg'
  }];

  getBooks = () => new Promise((resolve, reject) => setTimeout(() => {
    if (Math.random() > 0.9) {
      reject(new Error('Error.'));

    } else {
      resolve(this._data)
    }
  }, 700));
}