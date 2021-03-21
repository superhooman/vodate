import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Recorder from 'recorder-js';
import Link from 'next/link'
import Button from '../../../components/button';
import GlobalContext from "../../../utils/globalContext";

const TIME = 20

const Add = () => {
    const router = useRouter()
    const [audio, setAudio] = useState("");
    const [blob, setBlob] = useState(null);
    const {user, iPhone} = useContext(GlobalContext);
    const [started, setStarted] = useState(false);
    const [process, setProcess] = useState(0);
    const [sending, setSending] = useState(false);
    const startAudio = () => {
        setAudio("");
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            let second = 0;
            setProcess(0);
            setStarted(true);
            const context = new (window.AudioContext || window.webkitAudioContext)()
            const rec = new Recorder(context)
            rec.init(stream)
            
            rec.start()

            const interval = setInterval(() => {
                second++;
                setProcess(second);
                if (second === TIME) {
                    clearInterval(interval);
                    rec.stop().then(({blob}) => {
                        setProcess(TIME)
                        setStarted(false)
                        const audioUrl = URL.createObjectURL(blob);
                        setAudio(audioUrl);
                        setBlob(blob);
                    })
                }
            }, 1000);
        });
    };
    const playPause = () => {
        const sound = document.getElementById("audioRecording")
        sound.paused ? sound.play() : sound.pause();
    }
    useEffect(() => {
        const timeUpdate = (e) => {
            setProcess(Math.round(e.target.currentTime))
        }
        const sound = document.getElementById("audioRecording")
        if (sound && sound.pause) {
            sound.pause();
            sound.currentTime = 0;
        }
        if (audio) {
            setProcess(0);
            document.getElementById("audioRecording").addEventListener('timeupdate', timeUpdate)
        }
        return () => {
            if(document.getElementById("audioRecording")){
                document.getElementById("audioRecording").removeEventListener('timeupdate', timeUpdate)
            }
        }
    }, [audio]);
    const send = () => {
        if(!blob){
            return;
        }
        setSending(true);
        const fd = new FormData()
        fd.append('audio', blob, `${user.id}.wav`);
        axios({
            url: '/profile/',
            method: "POST",
            data: fd
        }).then((res) => {
            if(res.data && res.data.success){
                router.push('/app/profile')
            }
        })
    }
    return (
        <div className="p-8 min-h-screen flex flex-col justify-between">
            {audio ? <audio style={{
                display: 'none'
            }} autoPlay={false} id="audioRecording">
                <source src={audio} type="audio/wav"/>
            </audio> : null}
            <div>
                {!iPhone ? (<div className="bg-red-500 text-white text-xs leading-tight p-4 text-center rounded mb-2">
                    У пользовалетелй Android может не работать микрофон. К сожалению проблему могут исправить только разработчики aitu.
                </div>) : null}
                <h1 className="font-bold text-2xl text-center mb-2">
                    Запишите свою анкету
                </h1>
                <p className="text-sm opacity-70 text-center leading-tight">Нажмите на кнопку и запишите свою анкету. Вам будет дано {TIME} секунд, постарайтесь уместиться :D</p>
                <div className="flex items-center justify-center my-20">
                    <button
                        disabled={started}
                        onClick={audio ? playPause : startAudio}
                        className={`relative transition focus:outline-none transform active:scale-95 h-32 w-32 flex items-center justify-center rounded-full ${(started) || (audio && process) ? "bg-red-500 text-white" : "border-red-500 border-4 text-red-500"
                            }`}
                    >
                        {!audio ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2c-1.7 0-3 1.2-3 2.6v6.8c0 1.4 1.3 2.6 3 2.6s3-1.2 3-2.6V4.6C15 3.2 13.7 2 12 2z" />
                                <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18.4v3.3M8 22h8" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                        {!audio && started ? (
                            <div className="h-32 w-32 absolute bg-red-500 opacity-50 animate-ping rounded-full" />
                        ) : null}
                    </button>
                </div>
                <div className="px-8 mb-8">
                    <div className="h-2 w-full bg-gray-200 rounded-lg">
                        <div
                            style={{
                                width: `${(process) / TIME * 100}%`,
                                transition: process ? 'width linear 1s' : ''
                            }}
                            className="h-2 bg-red-500 rounded-lg"
                        />
                    </div>
                </div>
            </div>
            <div>
                {audio ? <Button onClick={startAudio} disabled={!(process === TIME || process === 0)} color="bg-red-500" colorDark="bg-red-500" text="text-white" textDark="text-white" className="w-full">Перезаписать</Button> : null}
                {blob ? <Button onClick={send} disabled={!audio || sending} color="bg-blue-500" colorDark="bg-blue-500" text="text-white" textDark="text-white" className="w-full mt-4">Сохранить</Button> : null}
                {!iPhone ? <Link href="/app"><Button className="w-full mt-4">Назад</Button></Link> : null}
            </div>
        </div>
    );
};

export default Add;
