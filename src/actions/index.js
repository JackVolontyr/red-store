const uploadBooks = (newBooks) => ({ type: 'UPLOAD_BOOKS', payload: newBooks });
const resetBooks = () => ({ type: 'RESET_BOOKS' });
const errorBooks = (error) => ({ type: 'ERROR_BOOKS', error: error });

export { uploadBooks, resetBooks, errorBooks };