import { useContext } from 'react';
import GlobalContext from '../utils/globalContext';

const TabBar = ({children}) => {
  const global = useContext(GlobalContext)
  return(
    <div style={{
      paddingBottom: global.isX ? '2rem' : undefined
    }} className="fixed bg-white dark:bg-black bottom-0 left-0 w-full px-6 py-2 flex justify-between border-t border-gray-200 dark:border-gray-700">
       {children}
    </div>
)
}

export default TabBar;