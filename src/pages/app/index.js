import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TabBar from "../../components/tabbar";

const App = () => {
    const router = useRouter();
    useEffect(() => {
        axios({
            url: '/user/check'
        }).catch(() => {
            router.push('/')
        })
    }, [])
    return(
        <div className="h-screen p-8 relative">
            <TabBar/>
        </div>
    )
}

export default App;