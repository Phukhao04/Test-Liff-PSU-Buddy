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

// หน้าที่ไม่ต้องการ HeadBar และ padding
const FULL_SCREEN_PATHS = ['/', '/menu', '/profile'];

const Layout = () => {
  const { isAuthDone, isLiffError } = useContext(Context);
  const location = useLocation();

  const isFullScreen = FULL_SCREEN_PATHS.includes(location.pathname);

  if (!isAuthDone) {
    return (
      <Suspense fallback={<Loading />}>
        <Loading />
      </Suspense>
    );
  }

  if (isLiffError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          LIFF Initialization Error
        </h1>
        <p className="text-red-500">
          Please ensure that you are accessing this application within the LINE app.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`pb-24 text-psu-deep-blue-500 min-h-screen flex flex-col items-center bg-linear-to-br from-psu-sritrang-200 to-psu-sritrang-500 overflow-auto ${
          isFullScreen ? '' : 'p-3'
        }`}
      >
        {!isFullScreen && <HeadBar />}

        <div className={`grow w-full ${isFullScreen ? '' : 'max-w-md'}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  </MotionRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <Menu />
                    </Suspense>
                  </MotionRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <Profile />
                    </Suspense>
                  </MotionRoute>
                }
              />
              {/* เพิ่ม route อื่นๆ ตรงนี้ในอนาคต */}
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