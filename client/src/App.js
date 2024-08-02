import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Page404 from "./pages/Page404";
import { toggleDarkMode } from "./slices/themeSlice";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MyFeed from "./components/core/Feed/MyFeed";
import Settings from "./components/core/Feed/Settings";
import MyPosts from "./components/core/Feed/MyPosts";
import MyProfile from "./components/core/Feed/MyProfile";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`w-screen ${token ? "bg-white" : "bg-ring"} dark:bg-confettiDarkColor1 bg-cover bg-center min-h-screen flex flex-col`}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Signup />
              </motion.div>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ForgotPassword />
              </motion.div>
            }
          />
          <Route
            path="/update-password/:uid"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <UpdatePassword />
              </motion.div>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <PrivacyPolicy />
              </motion.div>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TermsAndConditions />
              </motion.div>
            }
          />
          <Route
            path="/otp"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <OTP />
              </motion.div>
            }
          />
          <Route
            path="/feed"
            element={<Feed />}
          >
            <Route path="/feed/" element={<MyFeed/>} />
            <Route path="/feed/settings" element={<Settings/>} />
            <Route path="/feed/my-posts" element={<MyPosts/>} />
            <Route path="/feed/my-profile" element={<MyProfile/>} />

          </Route>
          <Route
            path="*"
            element={
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Page404 />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
