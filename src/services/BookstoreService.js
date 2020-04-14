export default class BookstoreService {
  getBooks = () => [{ 
      id: 1, 
      weblink: 'https://book-ye.com.ua/upload/iblock/277/99c35223_35ba_11e8_80f0_000c29ae1566_ee9e5d79_35ba_11e8_80f0_000c29ae1566.jpg',
      title: 'The Old Man and the Sea', 
      author: 'Ernest Hemmingway',
      price: 43, 
      cover: 'https://book-ye.com.ua/upload/iblock/277/99c35223_35ba_11e8_80f0_000c29ae1566_ee9e5d79_35ba_11e8_80f0_000c29ae1566.jpg' 
    }, { 
      id: 2,
      weblink: 'https://images-na.ssl-images-amazon.com/images/I/910CGpvNnkL.jpg',
      title: 'Treasure Island', 
      author: 'Robert Louis Stevenson',
      price: 50,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/910CGpvNnkL.jpg' 
    }, { 
      id: 3,
      weblink: 'https://images-na.ssl-images-amazon.com/images/I/414p0x7KV%2BL.jpg',
      title: 'Robinson Crusoe', 
      author: 'Daniel Defoe',
      price: 37,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/414p0x7KV%2BL.jpg'
    },
  ]
}