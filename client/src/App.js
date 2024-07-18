import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
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
import Feed from "./pages/Feed";
import { useLocation } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { toggleDarkMode } from "./slices/themeSlice";
import { useEffect } from "react";
import Page404 from "./pages/Page404";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();
  const darkMode  = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`w-screen ${token ? "bg-white" : "bg-ring"} bg-cover bg-center min-h-screen flex flex-col`}>
      {/* <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="fade"> */}
     
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password/:uid" element={<UpdatePassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/otp" element={<OTP />} />

            {/*DashBoard Paths Via Outlet*/}
            <Route path="/feed" element={ <Feed /> } >
              <Route path="/feed/settings" element=""/>
              <Route path="/feed/my-profile" element=""/>
              <Route path="" element=""/>
            </Route>
           
            <Route path="*" element={ <Page404 /> } />
          </Routes>
        
        {/* </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
}

export default App;
