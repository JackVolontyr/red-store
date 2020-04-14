import React from 'react';
import { ConsumerBookstoreService } from '../BookstoreServiceContext';

const connectHoc = (params) => (View) => (props) => <ConsumerBookstoreService>
  {(bookstoreService) => <View className={params} {...props} bookstoreService={bookstoreService} />}
</ConsumerBookstoreService>

export default connectHoc;