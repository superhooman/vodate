import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import Audio from "../../../components/audio";
import Button from "../../../components/button"
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
                if (!res.data.profile) {
                    router.push('/app/profile/add')
                } else {
                    setProfile({
                        isFetching: false,
                        data: res.data.profile
                    })
                }
            }
        })
    }, [])

    const remove = () => {
        axios({
            url: '/profile/',
            method: "DELETE"
        }).then((res) => {
            router.push('/app')
        })
    }
    if (profile.isFetching) {
        return (
            <Layout className="flex items-center justify-center">
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
            </Layout>
        )
    }

    return (
        <Layout className="flex flex-col justify-between">
            <h1 className="font-bold text-4xl">Анкета</h1>
            <Audio src={profile.data.audio} id="profile" />
            <div>
                <Button onClick={remove} color="bg-red-500" colorDark="bg-red-500" text="text-white" textDark="text-white" className="w-full">Удалить анкету</Button>
                <Link href="/app/profile/add">
                    <Button color="bg-blue-500" colorDark="bg-blue-500" text="text-white" textDark="text-white" className="w-full mt-4">
                        Перезаписать
                </Button>
                </Link>
            </div>
        </Layout>
    )
}

export default Profile;