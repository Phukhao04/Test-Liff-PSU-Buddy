import { useContext, useEffect, useState } from 'react';
import Context from '@/contexts/Context';
import {
  WiDaySunny,
  WiCloudy,
  WiNightClear,
  WiDayCloudy,
} from 'react-icons/wi';
import { FaUserGraduate, FaIdCard, FaUniversity, FaBookOpen } from 'react-icons/fa';
import Logo from '@/assets/img/logo.png';
import Jack from '@/assets/img/jack.png';

const Home = () => {
  const { language, theUser } = useContext(Context);
  const [greetingIcon, setGreetingIcon] = useState(null);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreetingIcon(<WiDayCloudy size={38} className="text-[#FDB813]" />);
      } else if (hour >= 12 && hour < 17) {
        setGreetingIcon(<WiDaySunny size={38} className="text-[#FDB813]" />);
      } else if (hour >= 17 && hour < 19) {
        setGreetingIcon(<WiCloudy size={38} className="text-gray-500" />);
      } else {
        setGreetingIcon(<WiNightClear size={38} className="text-[#5B6CFF]" />);
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const firstName = theUser?.name?.[language]?.split(' ')[0] ?? '';
  const fullName  = theUser?.name?.[language] ?? '';
  const studentId = theUser?.psuId ?? '';
  const faculty   = theUser?.facName?.[language] ?? '';
  const program   = theUser?.programName?.[language] ?? '';

  return (
    <div className="min-h-screen bg-white pb-32">

      {/* Header */}
      <div className="px-5 pt-6">
        <img src={Logo} alt="PSU Buddy" className="h-10 w-auto" />

        <div className="mt-3 flex items-center gap-2">
          <span className="text-3xl">{greetingIcon}</span>
          <p className="text-[20px] font-bold text-[#1f2a44]">
            {language === 'th' ? 'สวัสดี,' : 'Hello,'} {firstName}
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <section className="px-5 pt-4">
        <div className="relative rounded-[28px] bg-[#DFEBFF] px-5 py-5 min-h-[160px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

          {/* ข้อมูล */}
          <div className="space-y-3 text-[13px] text-[#1f2a44] max-w-[62%]">
            <div className="flex items-center gap-3">
              <FaUserGraduate className="text-[#003399] shrink-0" size={15} />
              <span>{fullName}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaIdCard className="text-[#003399] shrink-0" size={15} />
              <span>{studentId}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaUniversity className="text-[#003399] shrink-0" size={15} />
              <span>{`${language === 'th' ? 'คณะ' : 'Faculty'}${faculty}`}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaBookOpen className="text-[#003399] shrink-0" size={15} />
              <span>{program}</span>
            </div>
          </div>

          {/* มาสคอต */}
          <img
            src={Jack}
            alt="jack"
            className="absolute -bottom-0 -right-2 h-[250px] w-auto object-contain pointer-events-none"
          />

        </div>
      </section>

    </div>
  );
};

export default Home;