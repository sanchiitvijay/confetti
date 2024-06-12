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
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import OTP from "./pages/OTP";


function App() {
  const {token}=useSelector((state)=>state.auth);
  return (
    <div className="w-screen bg-cover bg-ring bg-center min-h-screen flex flex-col ">

      {
        token && <Nav/>
      }
      

      <Routes>
        <Route path="/" element={<Home/>}/>   
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/update-password/:uid" element={<UpdatePassword/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
        <Route path="/otp" element={<OTP/>}/>
      </Routes>




    </div>
  );
}

export default App;
