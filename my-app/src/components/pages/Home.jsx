import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '@/contexts/Context';
import { FaUserGraduate, FaIdCard, FaUniversity, FaBookOpen } from 'react-icons/fa';
import Logo from '@/assets/img/Logo.png';
import jack from '@/assets/img/jack.png';
import randa from '@/assets/img/randa.png';
import randah from '@/assets/img/randah.png';
import SunClouds from '@/assets/icons/sun_clouds.svg?react';
import MoonStars from '@/assets/icons/Moon_stars_and_cloud.svg?react';

import { getFeed } from '@/services/events.service';
import FeedCard from '@/components/modules/FeedCard';
import ReactCountryFlag from 'react-country-flag';

const mascotMap = {
  1: jack,
  2: randa,
  3: randah,
};

const getGreetingIcon = () => {
  const hour = new Date().getHours();
  const isDay = hour >= 5 && hour < 19;
  return isDay
    ? <SunClouds  className="w-12 h-12" />
    : <MoonStars  className="w-12 h-12" />;
};

const Home = () => {
  const { language, setLanguage, theUser, character } = useContext(Context);
  const navigate = useNavigate();

  const [greetingIcon, setGreetingIcon] = useState(() => getGreetingIcon());
  const [feed, setFeed] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setGreetingIcon(getGreetingIcon()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getFeed('01').then(setFeed).catch(console.error).finally(() => setFeedLoading(false));
  }, []);

  const firstName = theUser?.name?.[language]?.split(' ')[0] || theUser?.studNameThai || '';
  const fullName = theUser?.name?.[language] || `${theUser?.studNameThai ?? ''} ${theUser?.studSnameThai ?? ''}`;
  const studentId = theUser?.psuId ?? '';
  const faculty = theUser?.facName?.[language] || theUser?.facNameThai || '';
  const program = language === 'en'
    ? (theUser?.majorNameEng || theUser?.deptName?.en || theUser?.majorNameThai || '')
    : (theUser?.majorNameThai || theUser?.deptName?.th || '');
  const mascotSrc = mascotMap[character?.id] ?? jack;

  const toggleLanguage = () => setLanguage(prev => prev === 'th' ? 'en' : 'th');

  return (
    <div
      className="min-h-screen bg-white pb-32"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-6 flex items-center justify-between">
        <img src={Logo} alt="PSU Buddy" className="h-10 w-auto" />

        {/* ปุ่มขวาบน — pill เดียว */}
        <div
          className="flex items-center rounded-full px-1 py-1 gap-1"
          style={{ backgroundColor: character?.light ?? '#dbeafe' }}
        >
          {/* เปลี่ยนภาษา */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full px-2 py-1.5"
            style={{ backgroundColor: character?.mid ?? '#93c5fd' }}
          >
            <ReactCountryFlag
              countryCode={language === 'th' ? 'TH' : 'GB'}
              svg
              style={{ width: '20px', height: '20px', borderRadius: '999px', objectFit: 'cover' }}
            />
            <span className="text-[13px] font-bold text-white">
              {language === 'th' ? 'TH' : 'EN'}
            </span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* เปลี่ยนมาสคอต */}
          <button
            onClick={() => navigate('/change-character')}
            className="flex h-6 w-6 items-center justify-center rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_162_13785)">
                <path d="M7.00001 0L6.61501 0.0175L8.83751 2.24L9.62501 1.45833C11.5208 2.37417 12.8858 4.22333 13.0958 6.41667H13.9708C13.6733 2.82333 10.6692 0 7.00001 0ZM7.00001 2.33333C5.87417 2.33333 4.95834 3.24917 4.95834 4.375C4.95834 5.50083 5.87417 6.41667 7.00001 6.41667C8.12584 6.41667 9.04167 5.50083 9.04167 4.375C9.04167 3.24917 8.12584 2.33333 7.00001 2.33333ZM0.0291748 7.58333C0.326675 11.1767 3.33084 14 7.00001 14L7.38501 13.9825L5.16251 11.76L4.37501 12.5417C2.47917 11.6317 1.11417 9.77667 0.904175 7.58333H0.0291748ZM7.00001 7.58333C4.74251 7.58333 2.91667 8.49917 2.91667 9.625V10.5H11.0833V9.625C11.0833 8.49917 9.25751 7.58333 7.00001 7.58333Z"
                  fill={character?.color ?? '#003c71'}/>
              </g>
              <defs>
                <clipPath id="clip0_162_13785">
                  <rect width="14" height="14" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* Greeting + มาสคอต */}
      <div className="relative px-5 mt-9">
        <div className="flex items-center gap-2">
          <span className="flex items-center">{greetingIcon}</span>
          <p className="text-[20px] font-bold text-[#1f2a44]">
            {language === 'th' ? 'สวัสดี,' : 'Hello,'} {firstName}
          </p>
        </div>

        {/* มาสคอต */}
        <img
          src={mascotSrc}
          alt={character?.name ?? 'mascot'}
          className="absolute -top-9 -right-7 h-[300px] w-auto object-contain pointer-events-none drop-shadow-lg z-10"
        />
      </div>

      {/* Profile Card */}
      <section className="px-5 pt-3">
        <div
          className="rounded-[28px] px-5 py-5 min-h-[160px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          style={{
            background: `color-mix(in srgb, ${character?.color ?? '#4B8CD2'} 20%, white)`,
          }}
        >
          <div className="space-y-3 text-[13px] text-[#1f2a44] max-w-[62%]">
            <div className="flex items-center gap-3">
              <FaIdCard style={{ color: character?.color ?? '#003399' }} className="shrink-0" size={15} />
              <span>{studentId}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaUserGraduate style={{ color: character?.color ?? '#003399' }} className="shrink-0" size={15} />
              <span>{fullName}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaUniversity style={{ color: character?.color ?? '#003399' }} className="shrink-0" size={15} />
              <span>{faculty}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaBookOpen style={{ color: character?.color ?? '#003399' }} className="shrink-0" size={15} />
              <span>{program}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="px-5 pt-8">
        <p className="text-[17px] font-bold text-[#1f2a44] mb-3">
          {language === 'th' ? 'กิจกรรมที่เปิดรับสมัคร' : 'Open Activities'}
        </p>

        {feedLoading ? (
          <p className="text-sm text-gray-400">
            {language === 'th' ? 'กำลังโหลด...' : 'Loading...'}
          </p>
        ) : feed.length === 0 ? (
          <p className="text-sm text-gray-400">
            {language === 'th' ? 'ไม่มีกิจกรรมในขณะนี้' : 'No activities available'}
          </p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
            {feed.map((item) => (
              <div key={item._id} className="min-w-[75%] snap-center">
                <FeedCard item={item} language={language} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;