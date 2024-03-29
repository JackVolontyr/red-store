export default class BookstoreService {
	_data = [{
		id: 0,
		title: 'Kobzar',
		author: 'Taras Hryhorovych Shevchenko',
		price: 'invaluable',
		currency: '',
		quantity: 0,
		cover: '/red-store-build/kobzar-bilingva.jpg',
		isInCart: false,
		rating: 5,
	}, {
		id: 1,
		title: 'The Old Man and the Sea',
		author: 'Ernest Hemmingway',
		price: 4,
		currency: '$',
		quantity: 1,
		cover: 'https://upload.wikimedia.org/wikipedia/en/7/73/Oldmansea.jpg?20120115072708',
		isInCart: false,
		rating: 3,
	}, {
		id: 2,
		title: 'Treasure Island',
		author: 'Robert Louis Stevenson',
		price: 5,
		currency: '$',
		quantity: 0,
		cover: 'https://images-na.ssl-images-amazon.com/images/I/910CGpvNnkL.jpg',
		isInCart: false,
		rating: 1,
	}, {
		id: 3,
		title: 'Robinson Crusoe',
		author: 'Daniel Defoe',
		price: 2,
		currency: '$',
		quantity: 5,
		cover: 'https://images-na.ssl-images-amazon.com/images/I/414p0x7KV%2BL.jpg',
		isInCart: false,
		rating: 5,

	}, {
		id: 4,
		title: 'The Sea Wolf',
		author: 'Jack London',
		price: 3,
		currency: '$',
		quantity: 3,
		cover: 'https://kbimages1-a.akamaihd.net/602eabe2-2158-44df-ba9e-29ae8849493e/1200/1200/False/the-sea-wolf-14.jpg',
		isInCart: false,
		rating: 2,

	}, {
		id: 5,
		title: 'Moby-Dick, or The Whale',
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