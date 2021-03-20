import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";

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
        <Layout>
            <h1>Hello</h1>
        </Layout>
    )
}

export default App;