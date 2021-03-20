import { useContext, useState } from "react";
import Button from "../components/button";
import GlobalContext from "../utils/globalContext";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [audio, setAudio] = useState("");
  const global = useContext(GlobalContext);
  const startAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setStarted(true);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        /*const audio = new Audio(audioUrl);
          audio.play();*/
        setAudio(audioUrl);
        setStarted(false);
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000);
    });
  };
  if (!global.user) {
    return (
      <div className="flex items-center justify-center h-screen">
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
    );
  }
  return (
    <div className="h-screen px-8 pt-32 pb-12">
      <div className="flex h-full flex-col justify-between items-start">
        <div>
          <svg className="h-8" viewBox="0 0 237 230" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <path d="M13 87l109 131L225 72C185 7 151-5 122 37 94 78 57 95 13 87z" strokeWidth="24" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="font-bold text-3xl my-3">VoDate</h1>
          <p className="text-base opacity-70">{global.user.name}, добро пожаловать в VoDate! Здесь вы можете завести новые знакомства используя голос</p>
        </div>
        <Button className="w-full">Войти</Button>
      </div>
    </div>
  );
};

export default Index;
