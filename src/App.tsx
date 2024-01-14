import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./router"



// data.forEach((item) => deviceStore.addToDeviceList(item))

const App: FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
