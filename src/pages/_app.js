import { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';
import GlobalContext from '../utils/globalContext';

import '../styles/index.css';

const App = ({ Component, pageProps }) => {
    const [global, setGlobal] = useState({
        user: null
    })
    const getMe = async () => {
        try {
            const data = await aituBridge.getMe();
            return data;
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getMe().then((data) => {
            setGlobal({
                ...global,
                user: data
            })
        })
    }, [])
    return(
        <GlobalContext.Provider value={global}>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    )
}

export default App;