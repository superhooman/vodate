import { createContext } from 'react';

const GlobalContext = createContext({
  user: null,
  isX: false
});

export default GlobalContext;
