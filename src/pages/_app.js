import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import aituBridge from "@btsd/aitu-bridge";
import GlobalContext from "../utils/globalContext";

import "../styles/index.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [global, setGlobal] = useState({
    user: null,
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
      setGlobal({
        ...global,
        user: data,
      });
      axios({
        url: "/user/me",
        params: {
          id: data.id,
        },
      }).then((res) => {
        if (res.data && res.data.success) {
          router.push("/app");
        }
      });
    });
  }, []);
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </div>
  );
};

export default App;
