import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Context from '@/contexts/Context';
import BuddySVG from '@/assets/icons/buddy.svg?react';

const SVG_ANIM_DURATION = 5800;
const REDIRECT_DELAY = 8000;

const IntroScreen = () => {
  const navigate = useNavigate();
  const { character } = useContext(Context);

  const [assembleLogo, setAssembleLogo] = useState(false);
  const [ready, setReady] = useState(false);

  // รอ context โหลด localStorage เสร็จก่อน
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // SVG animation trigger
  useEffect(() => {
    const assembleTimer = setTimeout(() => {
      setAssembleLogo(true);
    }, SVG_ANIM_DURATION);
    return () => clearTimeout(assembleTimer);
  }, []);

  // redirect หลัง ready
  useEffect(() => {
    if (!ready) return;
    const redirectTimer = setTimeout(() => {
      navigate(character ? '/home' : '/splash', { replace: true });
    }, REDIRECT_DELAY);
    return () => clearTimeout(redirectTimer);
  }, [ready, character, navigate]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white">
      <div className="flex items-center justify-center whitespace-nowrap">

        {/* PSU */}
        <AnimatePresence>
          {assembleLogo && (
            <motion.span
              initial={{ opacity: 0, x: 120, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none text-[#192581]"
              style={{ fontFamily: 'PSU-Stidti, sans-serif', fontSize: '3.2rem' }}
            >
              PSU
            </motion.span>
          )}
        </AnimatePresence>

        {/* B */}
        <AnimatePresence>
          {assembleLogo && (
            <motion.span
              initial={{ opacity: 0, x: 70, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none text-[#192581]"
              style={{
                fontFamily: 'PSU-Stidti, sans-serif',
                fontSize: '3.2rem',
                marginLeft: '0.4rem',
                marginRight: '-0.9rem',
              }}
            >
              B
            </motion.span>
          )}
        </AnimatePresence>

        {/* Buddy SVG */}
        <motion.div
          animate={{ scale: assembleLogo ? 1 : 1.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <BuddySVG className="h-[4.8rem] w-[4.8rem] flex-shrink-0" />
        </motion.div>

        {/* ddy */}
        <AnimatePresence>
          {assembleLogo && (
            <motion.span
              initial={{ opacity: 0, x: -120, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none text-[#192581]"
              style={{
                fontFamily: 'PSU-Stidti, sans-serif',
                fontSize: '2.9rem',
                marginLeft: '-1rem',
              }}
            >
              ddy
            </motion.span>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default IntroScreen;