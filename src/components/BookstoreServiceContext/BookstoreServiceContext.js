import { createContext } from 'react';

const ContextBookstoreService = createContext();
const ProviderBookstoreService = ContextBookstoreService.Provider;
const ConsumerBookstoreService = ContextBookstoreService.Consumer;

export {
  ContextBookstoreService,
  ProviderBookstoreService,
  ConsumerBookstoreService,
};