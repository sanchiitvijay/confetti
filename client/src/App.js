import "./App.css"
import {Route,Routes} from "react-router-dom"
import { useSelector } from "react-redux";
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
import PrivateRoute from "./components/core/Auth/OpenRoute"
import Feed from "./pages/Feed";
import {  useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
function App() {
  const {token}=useSelector((state)=>state.auth);
  console.log("TOKEN:",token);
  let location=useLocation();
  return (
    <div className={`w-screen ${token?("bg-white"):("bg-ring")} bg-cover  bg-center min-h-screen flex flex-col `}>

    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames="fade"
      >
      <Routes>
        <Route path="/" element={<Home/>}/>   
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/update-password/:uid" element={<UpdatePassword/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
        <Route path="/otp" element={<OTP/>}/>
        <Route path="/feed" element={<Feed/>} />
        <Route path="*" element={""}/>
       </Routes>

       </CSSTransition>
       </TransitionGroup>


    </div>
  );
}

export default App;
