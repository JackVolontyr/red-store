import React from 'react';
import { ProviderBookstoreService } from '../BookstoreServiceContext'
import BookstoreService from '../../services/BookstoreService'

const App = () => {
  const bookstoreService = new BookstoreService();

  return <ProviderBookstoreService value={bookstoreService}>
    Hi! I am Redux App.
  </ProviderBookstoreService>
}

export default App;