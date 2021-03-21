import { useEffect, useState } from "react";

const Audio = ({ src, id }) => {
    const [ready, setReady] = useState(false);
    const [playing, setPlaying] = useState(false);
    const playAudio = () => {
        const el = document.getElementById(`audio_${id}`);
        if (el) {
            if (el.paused) {
                el.play();
                setPlaying(true)
            } else {
                el.pause();
                setPlaying(false)
            }
        }
    }
    useEffect(() => {
        const el = document.getElementById(`audio_${id}`);
        if (el) {
            el.addEventListener('ended', () => {
                setPlaying(false)
            })
        }
    }, [])
    return (
        <>
            <audio style={{
                display: 'none'
            }} onCanPlay={() => setReady(true)} autoPlay={false} id={`audio_${id}`}>
                <source src={src} type="audio/wav" />
            </audio>
            <div className="flex items-center justify-center my-20">
                <button onClick={playAudio} disabled={!ready} className={`absolute shadow-lg focus:outline-none transition transform active:scale-95 h-32 w-32 flex items-center justify-center rounded-full ${playing ? 'bg-red-500 text-white' : 'border-red-500 text-red-500 border-4'}`}>
                    {ready ? <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> : (<svg
                        className="animate-spin h-8 w-8"
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
                    </svg>)}
                    {playing ? (
                        <div className="h-32 w-32 absolute bg-red-500 opacity-50 animate-ping rounded-full" />
                    ) : null}
                </button>
            </div>
        </>
    )
}

export default Audio;