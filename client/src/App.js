import "./App.css";
import {Route,Routes} from "react-router-dom"
import { useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col ">

      <Navbar/>

      <Routes>
       


      </Routes>




    </div>
  );
}

export default App;
