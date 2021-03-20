import { useEffect, useState } from "react";
import Button from '../../../components/button';

const TIME = 5

const Add = () => {
    const [sound, setSound] = useState(null);
    const [audio, setAudio] = useState("");
    const [started, setStarted] = useState(false)
    const [process, setProcess] = useState(0);
    const startAudio = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            let second = 1;
            setStarted(true);
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];
            let interval;
            mediaRecorder.addEventListener("dataavailable", (event) => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                setProcess(TIME)
                setStarted(false)
                clearInterval(interval)
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
            });

            interval = setInterval(() => {
                setProcess(second);
                second++;
                if (second === TIME + 1) {
                    mediaRecorder.stop();
                }
            }, 1000);
        });
    };
    const playPause = () => {
        sound.paused ? sound.play() : sound.pause();
    }
    useEffect(() => {
        if (sound && sound.stop) {
            sound.stop();
            sound.currentTime = 0;
        }
        if (audio) {
            setProcess(0);
            const s = new Audio(audio);
            s.addEventListener('timeupdate', (e) => {
                setProcess(e.target.currentTime);
            })
            s.addEventListener('ended', e => {
                setProcess(TIME)
            })
            setSound(s)
        }
    }, [audio])
    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl text-center mb-2">
                Запишите свою анкету
            </h1>
            <p className="text-sm opacity-70 text-center leading-tight">
                Нажмите на кнопку и запишите свою анкету. Вам будет дано {TIME} секунд,
                постарайтесь уместиться :D
      </p>
            <div className="flex items-center justify-center my-24">
                {audio ? (<button
                    onClick={playPause}
                    className={`relative focus:outline-none transform active:scale-95 h-32 w-32 flex items-center justify-center rounded-full ${!audio.paused ? "bg-red-500 text-white" : "border-red-500 border-4 text-red-500"
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                </button>) : (<button
                    onClick={startAudio}
                    className={`relative focus:outline-none transform active:scale-95 h-32 w-32 flex items-center justify-center rounded-full ${started ? "bg-red-500 text-white" : "border-red-500 border-4 text-red-500"
                        }`}
                >
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
                    {started ? (
                        <div className="h-32 w-32 absolute bg-red-500 opacity-50 animate-ping rounded-full" />
                    ) : null}
                </button>)}
            </div>
            <div className="px-8">
                <div className="h-2 w-full bg-gray-200 rounded-lg">
                    <div
                        style={{
                            width: `${process / TIME * 100}%`,
                            transition: process ? 'width linear 1s' : ''
                        }}
                        className="h-2 bg-red-500 rounded-lg"
                    />
                </div>
            </div>
            <Button color="bg-red-500" colorDark="bg-red-500" text="text-white" textDark="text-white" className="w-full">Перезаписать</Button>
            <Button color="bg-blue-500" colorDark="bg-blue-500" text="text-white" textDark="text-white" className="w-full mt-4">Сохранить</Button>
        </div>
    );
};

export default Add;
