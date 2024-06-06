import "./App.css";
import {Route,Routes} from "react-router-dom"
import { useSelector } from "react-redux";
import Nav from "./components/common/Navbar";
import Home from "./pages/Home"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Signup from "./pages/Signup";

function App() {
  const {token}=useSelector((state)=>state.auth);
  return (
    <div className="w-screen min-h-screen flex flex-col ">

      {
        token && <Nav/>
      }
      

      <Routes>
        <Route path="/" element={<Home/>}/>   
        <Route path="/signup" element={<Signup/>}/>

      </Routes>




    </div>
  );
}

export default App;
