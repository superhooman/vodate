import { useContext } from "react";
import GlobalContext from "../utils/globalContext";

const Index = () => {
  const global = useContext(GlobalContext)
  return(
    <div className="min-h-screen flex items-center justify-center">
      {global.user ? global.user.name : 'ой-ой'}
    </div>
  )
}

export default Index;