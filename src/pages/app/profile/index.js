import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout"

const Profile = () => {
    const router = useRouter()
    const [profile, setProfile] = useState({
        isFetching: true,
        data: null
    })
    useEffect(() => {
        axios({
            url: '/profile'
        }).then((res) => {
            if (res.data && res.data.success) {
                if(!res.data.profile){
                    router.push('/app/profile/add')
                }else{
                    setProfile({
                        isFetching: false,
                        data: res.data.profile
                    })
                }
            }
        })
    }, [])
    if (profile.isFetching) {
        return (
            <Layout>
                <div className="h-full flex items-center justify-center">
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </div>
            </Layout>
        )
    }
    return (
        <Layout>
            <h1 className="font-bold text-4xl">Анкета</h1>
            <div className="h-full pb-48 flex items-center justify-center">
                <div className="h-20 w-20 flex items-center justify-center bg-red-500 text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-1.7 0-3 1.2-3 2.6v6.8c0 1.4 1.3 2.6 3 2.6s3-1.2 3-2.6V4.6C15 3.2 13.7 2 12 2z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18.4v3.3M8 22h8"/></svg>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;