import { createContext } from 'react';

const GlobalContext = createContext({
  user: null,
});

export default GlobalContext;
