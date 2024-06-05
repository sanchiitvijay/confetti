import "./App.css";
import {Route,Routes} from "react-router-dom"
import { useSelector } from "react-redux";
import Nav from "./components/common/Navbar";
import Home from "./pages/Home";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col ">

      <Nav/>

      <Routes>
        <Route path="/" element={<Home/>}/>   


      </Routes>




    </div>
  );
}

export default App;
