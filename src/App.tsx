import RootRouter from "./router/routes";
import { useRoutes } from "react-router-dom";
import "./App.css";
function App() {
  return <>{useRoutes(RootRouter)}</>;
}

export default App;
