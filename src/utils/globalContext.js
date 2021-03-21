import { createContext } from 'react';

const GlobalContext = createContext({
  user: null,
  isX: false,
  iPhone: false,
  count: 0,
  getCount: () => {}
});

export default GlobalContext;
