import { useNavigate } from 'react-router-dom';

import mascot from '@/assets/img/jack.png';
import logo from '@/assets/img/logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f9fc]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#eef5fc] to-[#dcecff]" />

      {/* Blur */}
      <div className="absolute left-[-40px] top-20 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute right-[-30px] top-60 h-52 w-52 rounded-full bg-sky-100/40 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">

        {/* Logo */}
        <img
          src={logo}
          alt="PSU Buddy"
          className="w-[300px] object-contain"
        />

        {/* Mascot */}
        <img
          src={mascot}
          alt="Mascot"
          className="mt-4 w-[260px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        />

        {/* Button */}
        <button
          onClick={() => navigate('/home')}
          className="mt-10 rounded-2xl bg-[#003c71] px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,60,113,0.25)] transition-all duration-200 active:scale-95"
        >
          เริ่มต้นใช้งาน
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;