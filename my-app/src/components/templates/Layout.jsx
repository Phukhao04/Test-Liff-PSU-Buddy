import { Suspense, lazy, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Context from '@/contexts/Context';
import Loading from './Loading';
import Footer from './Footer';
import HeadBar from './HeadBar';

const Home = lazy(() => import('../pages/Home'));
const Menu = lazy(() => import('../pages/Menu'));
const Profile = lazy(() => import('../pages/Profile'));
const StudentActivity = lazy(() => import('../pages/studentActivity/StudentActivity'));
const Dormitory = lazy(() => import('../pages/dormitory/Dormitory'));
const DormParcel = lazy(() => import('../pages/dormitory/DormParcel'));
const TrackProject = lazy(() => import('../pages/studentActivity/TrackProject'));

const FULL_SCREEN_PATHS = ['/', '/menu', '/profile', '/student/', '/dormitory/', '/dormitory/parcel', '/student/register'];

const Layout = () => {
  const { isAuthDone, isLiffError } = useContext(Context);
  const location = useLocation();

  const isFullScreen = FULL_SCREEN_PATHS.includes(location.pathname);

  if (!isAuthDone) {
    return <Suspense fallback={<Loading />}><Loading /></Suspense>;
  }

  if (isLiffError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">LIFF Initialization Error</h1>
        <p className="text-red-500">Please ensure that you are accessing this application within the LINE app.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`text-psu-deep-blue-500 min-h-screen flex flex-col items-center overflow-auto ${isFullScreen ? 'bg-white' : 'bg-linear-to-br from-psu-sritrang-200 to-psu-sritrang-500 p-3 pb-24'}`}>
        {!isFullScreen && <HeadBar />}
        <div className={`grow w-full ${isFullScreen ? '' : 'max-w-md'}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<MotionRoute><Suspense fallback={<Loading />}><Home /></Suspense></MotionRoute>} />
              <Route path="/menu" element={<MotionRoute><Suspense fallback={<Loading />}><Menu /></Suspense></MotionRoute>} />
              <Route path="/profile" element={<MotionRoute><Suspense fallback={<Loading />}><Profile /></Suspense></MotionRoute>} />
              <Route path="/student/" element={<MotionRoute><Suspense fallback={<Loading />}><StudentActivity /></Suspense></MotionRoute>} />
              <Route path="/dormitory/" element={<MotionRoute><Suspense fallback={<Loading />}><Dormitory /></Suspense></MotionRoute>} />
              <Route path="/dormitory/parcel" element={<MotionRoute><Suspense fallback={<Loading />}><DormParcel /></Suspense></MotionRoute>} />
              <Route path="/student/register" element={<MotionRoute><TrackProject /></MotionRoute>} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

const MotionRoute = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, rotateY: 90, x: 100 }}
    animate={{ opacity: 1, rotateY: 0, x: 0 }}
    exit={{ opacity: 0, rotateY: -90, x: -100 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default Layout;