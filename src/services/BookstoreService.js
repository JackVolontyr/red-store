export default class BookstoreService {
  _data = [{
    id: 1,
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemmingway',
    price: 43,
    currency: '$',
    quantity: 0,
    cover: 'https://book-ye.com.ua/upload/iblock/277/99c35223_35ba_11e8_80f0_000c29ae1566_ee9e5d79_35ba_11e8_80f0_000c29ae1566.jpg',
  }, {
    id: 2,
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    price: 50,
    currency: '$',
    quantity: 1,
    cover: 'https://images-na.ssl-images-amazon.com/images/I/910CGpvNnkL.jpg'
  }, {
    id: 3,
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    price: 37,
    currency: '$',
    quantity: 5,
    cover: 'https://images-na.ssl-images-amazon.com/images/I/414p0x7KV%2BL.jpg'
  }, {
    id: 4,
    title: 'The Sea Wolf',
    author: 'Jack London',
    price: 33,
    currency: '$',
    quantity: 3,
    cover: 'https://kbimages1-a.akamaihd.net/602eabe2-2158-44df-ba9e-29ae8849493e/1200/1200/False/the-sea-wolf-14.jpg'
  }, {
    id: 5,
    title: 'Moby-Dick, or The Whale',
    author: 'Herman Melville',
    price: 10,
    currency: '$',
    quantity: 2,
      cover: 'https://www.booklya.ua/content/upload/product/183k/183841/800x800/560616/moby-dick.jpg'
  }];

  getBooks = () => new Promise((resolve, reject) => setTimeout(() => {
    if (Math.random() > 0.9) {
    // if (false) {
      reject(new Error('Error.'));

    } else {
      resolve(this._data)
    }
  }, 700));
}