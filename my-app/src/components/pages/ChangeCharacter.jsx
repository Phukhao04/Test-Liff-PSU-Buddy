import { useState, useRef, useContext, useEffect } from 'react';
import useHaptic from '@/hooks/useHaptic';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Context from '@/contexts/Context';

import jack from '@/assets/img/jack.png';
import randa from '@/assets/img/randa.png';
import randah from '@/assets/img/randah.png';

const characters = [
  { id: 1, name: 'แจ็ค',     src: jack,   color: '#5aaef7', light: '#e0f2ff', mid: '#8bccfc', bg: ['#eef7ff','#cce8ff'] },
  { id: 2, name: 'แรนด้า',   src: randa,  color: '#d47ef5', light: '#fce8ff', mid: '#e7aafb', bg: ['#fdf0ff','#f5d4ff'] },
  { id: 3, name: 'แรนด๊ะห์', src: randah, color: '#8070e8', light: '#eeecff', mid: '#a191f8', bg: ['#f2f0ff','#ddd8ff'] },
];

const SWIPE = 50;
const N = characters.length;

const ChangeCharacter = () => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  const { character, setCharacter, language } = useContext(Context);

  const initIdx = characters.findIndex((c) => c.id === character?.id);
  const [current, setCurrent] = useState(initIdx >= 0 ? initIdx : 0);
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const touchX = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleOrientation = (e) => {
      const x = (e.gamma ?? 0) / 30;
      const y = (e.beta ?? 0) / 60;
      setTilt({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };
    if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(r => { if (r === 'granted') window.addEventListener('deviceorientation', handleOrientation); })
        .catch(() => { });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const goTo = (idx) => setCurrent(((idx % N) + N) % N);
  const char = characters[current];

  const handleConfirm = () => {
    haptic.medium();
    setCharacter(char);
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden">

      {/* BG */}
      <AnimatePresence mode="sync">
        <motion.div
          key={char.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ background: `linear-gradient(170deg, ${char.bg[0]} 0%, ${char.bg[1]} 100%)` }}
        />
      </AnimatePresence>

      {/* Glow blob */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 300, height: 300, top: '15%', left: '50%', background: char.mid, opacity: 0.2, filter: 'blur(80px)' }}
        animate={{
          x: `calc(-50% + ${tilt.x * 18}px)`,
          y: tilt.y * 12,
          scale: [1, 1.08, 1],
        }}
        transition={{ scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 0.4 }, y: { duration: 0.4 } }}
      />

      {/* Header */}
      <motion.div
        className="relative z-10 flex items-center px-5 pt-12 pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <button
          onClick={() => navigate(-1)}
          className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-[#1c1c1c]">
          {language === 'th' ? 'เปลี่ยนตัวละคร' : 'Change Character'}
        </h1>
      </motion.div>

      {/* Carousel */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (!touchX.current) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx < -SWIPE) goTo(current + 1);
          else if (dx > SWIPE) goTo(current - 1);
          touchX.current = null;
        }}
      >
        <div className="relative w-full h-[320px] flex items-end justify-center">
          {characters.map((c, i) => {
            let offset = i - current;
            if (offset > N / 2) offset -= N;
            if (offset < -N / 2) offset += N;

            const isActive = offset === 0;
            const angleDeg = offset * 46;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 140;
            const x = Math.sin(angleRad) * radius;
            const cosVal = Math.cos(angleRad);
            const scale = 0.25 + cosVal * 0.75
            const opacity = isActive ? 1 : 0.35 + cosVal * 0.3;
            const blur = isActive ? 0 : (1 - cosVal) * 4;
            const zIndex = Math.round(cosVal * 10);

            return (
              <motion.div
                key={c.id}
                className="absolute -bottom-9"
                style={{ zIndex, cursor: isActive ? 'default' : 'pointer' }}
                animate={{
                  x: x + (isActive ? tilt.x * 18 : 0),
                  y: isActive ? tilt.y * -12 : 0,
                  scale, opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => !isActive && goTo(i)}
              >
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{ width: 120, height: 18, background: char.mid, filter: 'blur(12px)' }}
                    animate={{ opacity: [0.4, 0.65, 0.4], scaleX: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <img
                  src={c.src}
                  alt={c.name}
                  className="w-[340px] h-[440px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                />
              </motion.div>

            );
          })}
          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 -mb-2">
            {characters.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: i === current ? 20 : 8,
                  opacity: i === current ? 1 : 0.3,
                  backgroundColor: char.color,
                }}
                style={{ height: 8 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <motion.div
        className="relative z-10 mx-4 mb-28 rounded-3xl bg-white px-6 py-5 shadow-md"
        style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        initial={{ opacity: 0, y: 32 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={char.name}
            className="mb-4 text-xl font-bold text-[#1c1c1c]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {char.name}
          </motion.p>
        </AnimatePresence>

        <motion.button
          onClick={handleConfirm}
          className="w-full rounded-2xl py-3.5 text-base font-bold text-white relative overflow-hidden"
          style={{ background: char.color }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: char.color, filter: 'blur(16px)', opacity: 0.5 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          />
          <span className="relative z-10">
            {language === 'th' ? 'เลือกตัวละครนี้' : 'Select'}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ChangeCharacter;