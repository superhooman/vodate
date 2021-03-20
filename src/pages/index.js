import { useContext } from "react";
import GlobalContext from "../utils/globalContext";

const Index = () => {
  const global = useContext(GlobalContext)
  return(
    <div className="min-h-screen flex items-center justify-center">
      {global.user ? (
        <div>
          {JSON.stringify(global.user)}
        </div>
      ) : 'ой-ой'}
    </div>
  )
}

export default Index;