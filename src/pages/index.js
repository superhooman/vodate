import { useContext, useState } from "react";
import GlobalContext from "../utils/globalContext";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [audio, setAudio] = useState("");
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
          /*const audio = new Audio(audioUrl);
          audio.play();*/
          setAudio(audioUrl);
          setStarted(false)
        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 3000);
      });
  }
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
      <div className="block text-center mb-2">
          {global.user ? global.user.name : 'ой-ой'}
        </div>
        <code className="block mb-8 w-full p-4 rounded bg-gray-200 overflow-scroll">
          {JSON.stringify(global.user)}
        </code>
        <button disabled={started} onClick={startAudio} className="py-4 px-12 text-center mb-4 rounded bg-red-500 text-white disabled:opacity-50">{started ? '...' : "startAudio"}</button>
      {audio ? (<audio controls>
  <source src={audio} type="audio/mpeg"/>
</audio>) : null}
      </div>
     
    </div>
  )
}

export default Index;