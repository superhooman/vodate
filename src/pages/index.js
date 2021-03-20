import { useContext, useState } from "react";
import GlobalContext from "../utils/globalContext";

const Index = () => {
  const [started, setStarted] = useState(false)
  const global = useContext(GlobalContext);
  const startAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setStarted(true);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
          setStarted(false)
        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 3000);
      });
  }
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
      {global.user ? (
        <div>
          {global.user.name}
        </div>
      ) : 'ой-ой'}
      <button disabled={started} onClick={startAudio} className="py-4 px-12 text-center rounded bg-red-500 text-white disabled:opacity-50">{started ? '...' : "startAudio"}</button>
    </div>
  )
}

export default Index;