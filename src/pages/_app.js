import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import aituBridge from "@btsd/aitu-bridge";
import GlobalContext from "../utils/globalContext";

import "../styles/index.css";
import axios from "axios";

const TEST = { "name": "Adam", "lastname": "Cosman", "sign": "6zGcrTgjus51UZjeLlE-B70HWJzuFoWgbRxAih7AHMI=", "id": "7c5bb714-8d14-11e9-9b32-465bcc60423b", "avatar": "https://media.aitu.btsdapps.net/api/v2/media/download/avatar/7d05a913-8d14-11e9-97e6-de0b7d6969f6", "avatarThumb": "https://media.aitu.btsdapps.net/api/v2/media/download/avatar/7d05a913-8d14-11e9-97e6-de0b7d6969f6?thumb" }
const PROD = process.env.NODE_ENV === "production"

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const [global, setGlobal] = useState({
        user: PROD ? null : TEST,
        isX: false,
        iPhone: false,
        count: 0
    });
    const getCount = () => {
        axios({
            url: "/match/myCount",
        }).then((res) => {
            if(res.data && res.data.success){
                setGlobal({
                    ...global,
                    count: res.data.matches
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const getMe = async () => {
        try {
            const data = await aituBridge.getMe();
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        PROD && getMe().then((data) => {
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
                    getCount()
                }
            }).catch((err) => {
                console.log(err)
            });
        });
    }, []);
    useLayoutEffect(() => {
        const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream
        const aspect = window.screen.width / window.screen.height
        const isX = (aspect.toFixed(3) === "0.462") && iPhone
        setGlobal(g => ({
            ...g,
            isX,
            iPhone
        }))
    }, [])
    return (
        <GlobalContext.Provider value={{
            ...global,
            getCount
        }}>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    );
};

export default App;
