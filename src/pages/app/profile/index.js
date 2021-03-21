import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import Button from "../../../components/button"
import Layout from "../../../components/layout"

const Profile = () => {
    const router = useRouter()
    const [profile, setProfile] = useState({
        isFetching: true,
        data: null
    })
    const [playing, setPlaying] = useState(false);
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
    const playAudio = () => {
        const s = document.getElementById("audioMain");

        if (s.paused) {
            s.play()
        } else {
            s.pause();
            s.currentTime = 0;
        }
    }
    useLayoutEffect(() => {
        if(profile.data && profile.data.audio){
            document.getElementById("audioMain").addEventListener('play', () => {
                setPlaying(true);
            })
            document.getElementById("audioMain").addEventListener('pause', () => {
                setPlaying(false)
            })
        }
    }, [profile.data])
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
        <Layout className="flex flex-col justify-between">
            <audio style={{
                display: 'none'
            }} autoPlay={false} id="audioMain">
                <source src={profile.data.audio} type="audio/wav" />
            </audio>
            <h1 className="font-bold text-4xl">Анкета</h1>
            <div className="flex items-center justify-center my-20">
                <button onClick={playAudio} className={`absolute focus:outline-none transition transform active:scale-95 h-32 w-32 flex items-center justify-center rounded-full ${playing ? 'bg-red-500 text-white' : 'border-red-500 text-red-500 border-4'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    {playing ? (
                            <div className="h-32 w-32 absolute bg-red-500 opacity-50 animate-ping rounded-full" />
                        ) : null}
                </button>
            </div>
            <Link href="/app/profile/add">
                <Button color="bg-blue-500" colorDark="bg-blue-500" text="text-white" textDark="text-white" className="w-full mt-4">
                    Перезаписать
                </Button>
            </Link>
        </Layout>
    )
}

export default Profile;