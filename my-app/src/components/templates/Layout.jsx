import { Suspense, lazy, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Context from '@/contexts/Context';

import Loading from './Loading';
import Footer from './Footer';

const SplashScreen = lazy(() =>
  import('../pages/SplashScreen')
);

const Home = lazy(() =>
  import('../pages/Home')
);

const Menu = lazy(() =>
  import('../pages/Menu')
);

const Profile = lazy(() =>
  import('../pages/Profile')
);

const StudentActivity = lazy(() =>
  import('../pages/studentActivity/StudentActivity')
);

const Dormitory = lazy(() =>
  import('../pages/dormitory/Dormitory')
);

const DormParcel = lazy(() =>
  import('../pages/dormitory/DormParcel')
);

const TrackProject = lazy(() =>
  import('../pages/studentActivity/TrackProject')
);

const TestRadar = lazy(() =>
  import('../pages/TestRadar')
);

const FULL_SCREEN_PATHS = [
  '/',
  '/home',
  '/menu',
  '/profile',
  '/student/',
  '/dormitory/',
  '/dormitory/parcel',
  '/student/register',
  '/test-radar',
];

const Layout = () => {
  const { isAuthDone, isLiffError } = useContext(Context);

  const location = useLocation();

  const isFullScreen =
    FULL_SCREEN_PATHS.includes(location.pathname);

  if (!isAuthDone) {
    return (
      <Suspense fallback={<Loading />}>
        <Loading />
      </Suspense>
    );
  }

  if (isLiffError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-100 p-4">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          LIFF Initialization Error
        </h1>

        <p className="text-center text-red-500">
          Please ensure that you are accessing this
          application within the LINE app.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen overflow-auto text-psu-deep-blue-500 ${
          isFullScreen
            ? 'bg-white'
            : 'flex flex-col items-center bg-linear-to-br from-psu-sritrang-200 to-psu-sritrang-500 p-3 pb-24'
        }`}
      >
        <div
          className={`grow w-full ${
            isFullScreen ? '' : 'max-w-md'
          }`}
        >
          <AnimatePresence mode="wait">
            <Routes
              location={location}
              key={location.pathname}
            >
              {/* Splash */}
              <Route
                path="/"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <SplashScreen />
                    </Suspense>
                  </MotionRoute>
                }
              />

              {/* Home */}
              <Route
                path="/home"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  </MotionRoute>
                }
              />

              {/* Menu */}
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

              {/* Profile */}
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

              {/* Student Activity */}
              <Route
                path="/student/"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <StudentActivity />
                    </Suspense>
                  </MotionRoute>
                }
              />

              {/* Dormitory */}
              <Route
                path="/dormitory/"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <Dormitory />
                    </Suspense>
                  </MotionRoute>
                }
              />

              {/* Dorm Parcel */}
              <Route
                path="/dormitory/parcel"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <DormParcel />
                    </Suspense>
                  </MotionRoute>
                }
              />

              {/* Track Project */}
              <Route
                path="/student/register"
                element={
                  <MotionRoute>
                    <TrackProject />
                  </MotionRoute>
                }
              />

              {/* Test Radar */}
              <Route
                path="/test-radar"
                element={
                  <MotionRoute>
                    <Suspense fallback={<Loading />}>
                      <TestRadar />
                    </Suspense>
                  </MotionRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>

      {/* Hide footer on splash screen */}
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

const MotionRoute = ({ children }) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -20,
    }}
    transition={{
      duration: 0.3,
      ease: 'easeInOut',
    }}
    className="h-full w-full"
  >
    {children}
  </motion.div>
);

export default Layout;