import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import aituBridge from "@btsd/aitu-bridge";
import GlobalContext from "../utils/globalContext";

import "../styles/index.css";
import axios from "axios";

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const [global, setGlobal] = useState({
        user: null,
        isX: false
    });
    const getMe = async () => {
        try {
            const data = await aituBridge.getMe();
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getMe().then((data) => {
            setGlobal(gl => ({
                ...gl,
                user: data,
            }));
            axios({
                url: "/user/me",
                params: {
                    id: data.id,
                },
            }).then((res) => {
                if (res.data && res.data.success) {
                    router.push("/app");
                }
            }).catch((err) => {
                console.log(err)
            });
        });
    }, []);
    useLayoutEffect(() => {
        let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream
        let aspect = window.screen.width / window.screen.height
        if (iPhone && aspect.toFixed(3) === "0.462") {
            setGlobal(global => ({
                ...global,
                isX: true
            }))
        }
    }, [])
    return (
        <GlobalContext.Provider value={global}>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    );
};

export default App;
