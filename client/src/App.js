import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Page404 from "./pages/Page404";
import MetaData from "./services/MetaData";
import useFirebaseMessaging from "./hooks/useFirebaseMessaging";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import OTP from "./pages/OTP"
import PostNotFound from "./pages/PostNotFound";
const Feed = lazy(() => import( "./pages/Feed"));
const MyFeed = lazy(() => import( "./components/core/Feed/MyFeed"));
const Settings = lazy(() => import( "./components/core/Feed/Settings"));
const MyPosts = lazy(() => import( "./components/core/Feed/MyPosts"));
const MyProfile = lazy(() => import( "./components/core/Feed/MyProfile"));
const StatsPage = lazy(() => import( "./pages/StatsPage"));
const BuyUsACoffee = lazy(() => import( "./pages/BuyUsACoffee"));
const AboutUs = lazy(() => import( "./pages/AboutUs"));
const PostPage = lazy(() => import( "./pages/PostPage"));

function App() {
  const { token } = useSelector((state) => state.auth);
  let location = useLocation();
  const darkMode = useSelector(state => state.theme.darkMode);
  const navigate=useNavigate();
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [darkMode]);
 
  useFirebaseMessaging();
  
  return (
    <div className={`w-screen ${token ? "bg-white" : "bg-ring"} dark:bg-confettiDarkColor1 bg-cover bg-center min-h-screen flex flex-col`}>
      <MetaData />
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
            <Route path="/feed/:postid" element = { <PostPage/> } />
            <Route path="/feed/settings" element={<Settings/>} />
            <Route path="/feed/my-posts" element={<MyPosts/>} />
            <Route path="/feed/my-profile" element={<MyProfile/>} />
            <Route path="/feed/about-us" element={<AboutUs/>} />
            <Route path="/feed/stats" element={<StatsPage/>} />
            <Route path="/feed/buy-us-coffee" element={<BuyUsACoffee/>} />
            <Route path="/feed/userid" element = { <PostPage/> } />
            <Route path="/feed/post-not-found" element = { <PostNotFound/> } />
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
