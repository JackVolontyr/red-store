import React from 'react';
import { ConsumerBookstoreService } from '../BookstoreServiceContext';

const withBookstoreServiceContext = (params) => (View) => (props) => <ConsumerBookstoreService>
  {(bookstoreService) => <View className={params} {...props} bookstoreService={bookstoreService} />}
</ConsumerBookstoreService>

export default withBookstoreServiceContext;