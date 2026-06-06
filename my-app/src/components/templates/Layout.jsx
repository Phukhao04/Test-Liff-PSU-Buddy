import { Suspense, lazy, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Context from '@/contexts/Context';

import Loading from './Loading';
import Footer from './Footer';

const RegisterScreen   = lazy(() => import('../pages/RegisterScreen'));
const IntroScreen      = lazy(() => import('../pages/IntroScreen'));
const SplashScreen     = lazy(() => import('../pages/SplashScreen'));
const Home             = lazy(() => import('../pages/Home'));
const Menu             = lazy(() => import('../pages/Menu'));
const StudentActivity  = lazy(() => import('../pages/studentActivity/StudentActivity'));
const Emergency        = lazy(() => import('../pages/Emergency'));
const LearningLinks    = lazy(() => import('../pages/LearningLinks'));
const ChangeCharacter  = lazy(() => import('../pages/ChangeCharacter'));

// ─── Mobile Shell ────────────────────────────────────────────────
const MobileShell = ({ children }) => (
  <div className="flex min-h-screen w-full items-center justify-center bg-gray-200">
    <div
      className="
        relative flex flex-col overflow-hidden bg-white
        w-screen h-[100dvh]
        sm:w-[390px] sm:h-[844px] sm:rounded-[44px]
        sm:shadow-[0_32px_80px_rgba(0,0,0,0.35)]
      "
    >
      {children}
    </div>
  </div>
);

// ─── Route wrapper ───────────────────────────────────────────────
const Lazy = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="h-full w-full"
  >
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  </motion.div>
);

const Layout = () => {
  const { isAuthDone, isLiffError } = useContext(Context);
  const location = useLocation();

  if (!isAuthDone) {
    return (
      <MobileShell>
        <Loading />
      </MobileShell>
    );
  }

  if (isLiffError) {
    return (
      <MobileShell>
        <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
          <p className="text-lg font-bold text-red-500">เกิดข้อผิดพลาด</p>
          <p className="text-[13px] text-gray-500">
            กรุณาเปิดแอปนี้ผ่าน LINE เท่านั้น
          </p>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className={`relative h-full w-full overflow-y-auto overflow-x-hidden ${location.pathname === '/change-character' ? '' : 'pb-24'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/register"         element={<Lazy><RegisterScreen /></Lazy>} />
            <Route path="/"                 element={<Lazy><IntroScreen /></Lazy>} />
            <Route path="/splash"           element={<Lazy><SplashScreen /></Lazy>} />
            <Route path="/home"             element={<Lazy><Home /></Lazy>} />
            <Route path="/menu"             element={<Lazy><Menu /></Lazy>} />
            <Route path="/student"          element={<Lazy><StudentActivity /></Lazy>} />
            <Route path="/emergency"        element={<Lazy><Emergency /></Lazy>} />
            <Route path="/learning-links"   element={<Lazy><LearningLinks /></Lazy>} />
            <Route path="/change-character" element={<Lazy><ChangeCharacter /></Lazy>} />
          </Routes>
        </AnimatePresence>
      </div>

      {location.pathname !== '/' && <Footer />}
    </MobileShell>
  );
};

export default Layout;