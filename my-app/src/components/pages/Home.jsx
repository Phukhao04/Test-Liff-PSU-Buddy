import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '@/contexts/Context';
import Wel from '@/assets/img/Welcome.png';
import banner from '@/assets/img/banner.png';

import {
  FaGraduationCap,
  FaBuilding,
  FaBookOpen,
  FaPhone,
} from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

const news = [
  {
    tag: 'สอบ',
    tagColor: 'bg-blue-500',
    date: '20 มิ.ย. 2568',
    title: 'ตารางสอบกลางภาค ภาคการศึกษา 1/2568',
    desc: 'ตรวจสอบตารางสอบและระเบียบการสอบที่นี่',
    img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=60',
  },
  {
    tag: 'กิจกรรม',
    tagColor: 'bg-orange-400',
    date: '12 ส.ค. 2569',
    title: 'กิจกรรม PSU Open House 2026 เปิดบ้าน ม.อ. สู่อนาคตของคุณ',
    desc: 'พบกับกิจกรรมสุดยิ่งใหญ่ สัมผัสประสบการณ์จริงในรั้วมหาวิทยาลัย',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=60',
  },
  {
    tag: 'ประกาศ',
    tagColor: 'bg-red-500',
    date: '',
    title: 'แจ้งปิดปรับปรุงระบบ',
    desc: 'ระบบจะปิดให้บริการชั่วคราว โปรดวางแผนการใช้งานล่วงหน้า',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=60',
  },
];

const Home = () => {
  const { language } = useContext(Context);
  const navigate = useNavigate();
  const [activeNews, setActiveNews] = useState(0);

  const shortcutItems = [
    { label: { th: 'SIS', en: 'SIS' }, icon: <FaGraduationCap size={26} />, color: 'text-blue-500', bg: 'bg-blue-50', path: '/student/' },
    { label: { th: 'หอพัก', en: 'Dormitory' }, icon: <FaBuilding size={26} />, color: 'text-indigo-500', bg: 'bg-indigo-50', path: '/dormitory/' },
    { label: { th: 'LMS', en: 'LMS' }, icon: <FaBookOpen size={26} />, color: 'text-yellow-500', bg: 'bg-yellow-50', path: '/others/' },
    { label: { th: 'เบอร์โทรฉุกเฉิน', en: 'Emergency' }, icon: <FaPhone size={26} />, color: 'text-gray-700', bg: 'bg-gray-100', path: '/others/' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Hero */}
      <section
        className="relative h-64 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Wel})` }}
      />

      {/* Main Card */}
      <div className="relative -mt-8 rounded-t-4xl bg-white px-5 pb-32 pt-5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">

        {/* เมนูลัด */}
        <section>
          <p className="mb-4 text-[20px] font-bold text-gray-900">
            {language === 'th' ? 'เมนูลัด' : 'Shortcuts'}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {shortcutItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center active:scale-95 transition"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <span className="mt-2 text-[11px] text-center leading-tight text-gray-600">
                  {item.label[language]}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ข่าวสาร */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[20px] font-bold text-gray-900">
              {language === 'th' ? 'ข่าวสาร' : 'News'}
            </p>
            <button className="text-[12px] font-medium text-psu-deep-blue-500">
              {language === 'th' ? 'ดูทั้งหมด' : 'See all'}
            </button>
          </div>

          <div
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
            onScroll={(e) => {
              const index = Math.round(e.target.scrollLeft / (e.target.offsetWidth * 0.6));
              setActiveNews(index);
            }}
          >
            {news.map((item, index) => (
              <div
                key={index}
                className="min-w-[60%] snap-start overflow-hidden rounded-2xl bg-white shadow-md"
              >
                {/* รูป + tag + วันที่ */}
                <div className="relative h-28 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }}>
                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  {item.date && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] text-white">
                      {item.date}
                    </span>
                  )}
                </div>

                <div className="px-3 pb-3 pt-2">
                  <p className="text-[13px] font-bold leading-tight text-gray-900 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-500 line-clamp-2">
                    {item.desc}
                  </p>
                  <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-psu-deep-blue-500">
                    {language === 'th' ? 'อ่านต่อ' : 'Read more'}
                    <FaArrowRight size={9} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Banner */}
        <section className="mt-6">
          <div
            className="relative overflow-hidden rounded-2xl px-4 py-4 text-white shadow-lg"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="max-w-[65%]">
              <p className="text-[16px] font-bold leading-tight">ไม่พลาดทุกข่าวสารสำคัญ!</p>
              <p className="mt-1 text-[12px] text-white/80">
                ติดตามเรา ผ่านช่องทางต่างๆ
              </p>
              <button className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-psu-deep-blue-500 shadow-lg hover:shadow-xl transition">                {language === 'th' ? 'ดูช่องทางทั้งหมด' : 'Follow us'}
                <FaArrowRight size={9} />
              </button>
            </div>
            <div className="absolute -right-2 bottom-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;