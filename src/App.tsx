import RootRouter from "./router/routes"
import React, { RouteObject, useRoutes } from "react-router-dom"
import "./App.css"
function App() {
  return <>{useRoutes(RootRouter as RouteObject[])}</>
}

export default App
