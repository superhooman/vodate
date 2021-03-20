import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
        <div className="h-screen">
            <div className="p-8">
                <h1>Hello</h1>
            </div>
        </div>
    )
}

export default App;