export default class BookstoreService {
  _data = [{
    id: 1,
    title: '1) The Old Man and the Sea',
    author: 'Ernest Hemmingway',
    price: 4,
    currency: '$',
    quantity: 1,
    cover: 'https://book-ye.com.ua/upload/iblock/277/99c35223_35ba_11e8_80f0_000c29ae1566_ee9e5d79_35ba_11e8_80f0_000c29ae1566.jpg',
    isInCart: false,
    rating: 3,
  }, {
    id: 2,
    title: '2) Treasure Island price - 5',
    author: 'Robert Louis Stevenson',
    price: 5,
    currency: '$',
    quantity: 0,
    cover: 'https://images-na.ssl-images-amazon.com/images/I/910CGpvNnkL.jpg',
    isInCart: false,
    rating: 1,
  }, {
    id: 3,
    title: '3) Robinson Crusoe',
    author: 'Daniel Defoe',
    price: 2,
    currency: '$',
    quantity: 5,
    cover: 'https://images-na.ssl-images-amazon.com/images/I/414p0x7KV%2BL.jpg',
    isInCart: false,
    rating: 5,

  }, {
    id: 4,
    title: '4) The Sea Wolf',
    author: 'Jack London',
    price: 3,
    currency: '$',
    quantity: 3,
    cover: 'https://kbimages1-a.akamaihd.net/602eabe2-2158-44df-ba9e-29ae8849493e/1200/1200/False/the-sea-wolf-14.jpg',
    isInCart: false,
    rating: 2,

  }, {
    id: 5,
    title: '5) Moby-Dick, or The Whale',
    author: 'Herman Melville',
    price: 1,
    currency: '$',
    quantity: 2,
    cover: 'https://www.booklya.ua/content/upload/product/183k/183841/800x800/560616/moby-dick.jpg',
    isInCart: false,
    rating: 4,

  }];

  getBooks = () => new Promise((resolve, reject) => setTimeout(() => {
    // if (Math.random() > 0.9) {
    if (false) {
      reject(new Error('Error.'));

    } else {
      resolve(this._data)
    }
  }, 700));
}