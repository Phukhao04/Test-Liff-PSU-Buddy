import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '@/contexts/Context';
import Service from '@/assets/img/Service.png';
import {
  FaBuilding,
  FaBookOpen,
  FaShieldAlt,
  FaPhoneAlt,
  FaCalendarCheck,
  FaGift,
  FaBus,
  FaRunning,
  FaBullhorn,
  FaBoxOpen,
  FaPlayCircle,
  FaIdBadge,
  FaGraduationCap,
  FaChartBar,
} from 'react-icons/fa';
import { FaBahtSign } from 'react-icons/fa6';

const langs = {
  menuTitle: { th: 'Service', en: 'Service' },
  sectionActivity: { th: 'กิจกรรม & สิทธิพิเศษ', en: 'Activities & Privileges' },
  sectionLearning: { th: 'การเรียน', en: 'Learning' },
  pleaseLogin: { th: 'กรุณาเข้าสู่ระบบเพื่อใช้งานเมนู', en: 'Please login to use services' },
};

const Menu = () => {
  const { theUser, language } = useContext(Context);
  const navigate = useNavigate();

  const sections = [
    {
      title: langs.sectionActivity[language],
      items: [
        { label: language === 'th' ? 'ทุนการศึกษา/กยศ.' : 'Scholarship', icon: <FaBahtSign />, color: 'text-gray-900', bg: 'bg-[#EEF2FF]', path: '/scholarship/' },
        { label: language === 'th' ? 'สุขภาพ' : 'Health', icon: <FaBookOpen />, color: 'text-blue-500', bg: 'bg-[#EEF2FF]', path: '/well-being/' },
        { label: language === 'th' ? 'ประกันอุบัติเหตุ' : 'Insurance', icon: <FaShieldAlt />, color: 'text-yellow-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: language === 'th' ? 'เบอร์ติดต่อฉุกเฉิน' : 'Emergency', icon: <FaPhoneAlt />, color: 'text-gray-900', bg: 'bg-[#EEF2FF]', path: '/others/' },
      ],
    },
    {
      title: langs.sectionActivity[language],
      items: [
        { label: language === 'th' ? 'สมัครเข้าร่วมกิจกรรม' : 'Activities', icon: <FaCalendarCheck />, color: 'text-pink-500', bg: 'bg-[#EEF2FF]', path: '/student/' },
        { label: language === 'th' ? 'สิทธิพิเศษ' : 'Privileges', icon: <FaGift />, color: 'text-gray-900', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: language === 'th' ? 'หอพัก' : 'Dormitory', icon: <FaBuilding />, color: 'text-indigo-600', bg: 'bg-[#EEF2FF]', path: '/dormitory/' },
        { label: language === 'th' ? 'ติดตามรถบัส' : 'Bus Tracking', icon: <FaBus />, color: 'text-yellow-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
      ],
    },
    {
      title: langs.sectionActivity[language],
      items: [
        { label: language === 'th' ? 'จองสนามกีฬา' : 'Booking', icon: <FaRunning />, color: 'text-blue-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: language === 'th' ? 'ผลการประเมิน PSU Style' : 'PSU Style', icon: <FaChartBar />, color: 'text-indigo-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: language === 'th' ? 'แบบฟอร์มร้องเรียน' : 'Complaint', icon: <FaBullhorn />, color: 'text-gray-900', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: language === 'th' ? 'แจ้งของหาย' : 'Lost & Found', icon: <FaBoxOpen />, color: 'text-gray-900', bg: 'bg-[#EEF2FF]', path: '/others/' },
      ],
    },
    {
      title: langs.sectionLearning[language],
      items: [
        { label: 'MOOC', icon: <FaPlayCircle />, color: 'text-indigo-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: 'LMS', icon: <FaBookOpen />, color: 'text-yellow-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: 'LibX', icon: <FaIdBadge />, color: 'text-indigo-500', bg: 'bg-[#EEF2FF]', path: '/others/' },
        { label: 'SIS', icon: <FaGraduationCap />, color: 'text-blue-500', bg: 'bg-[#EEF2FF]', path: '/student/' },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-100">
      {/* Hero */}
      <section
        className="relative h-64 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Service})`,
        }}
      >
        {/* <div className="relative z-10 flex h-full items-center px-7 pt-17">
          <h1 className="text-[28px] font-extrabold leading-tight text-white">
            {langs.menuTitle[language]}
          </h1>
        </div> */}
      </section>

      {/* Main Card */}
      <div className="relative -mt-8 rounded-t-[28px] bg-white px-5 pb-32 pt-5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">        {!theUser && (
        <div className="rounded-[18px] bg-gray-50 p-5 text-center text-sm text-gray-600">
          {langs.pleaseLogin[language]}
        </div>
      )}

        {theUser?.psuType === 'student' && (
          <div className="space-y-4">
            {sections.map((section, sectionIndex) => (
              <ServiceSection
                key={sectionIndex}
                items={section.items}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceSection = ({ title, items, navigate }) => {
  return (
    <section className="rounded-[18px] bg-white px-4 py-4 shadow-sm">
      <p className="mb-4 text-[13px] font-medium text-gray-900">{title}</p>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-2 transition active:scale-95"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bg}`}>
              <span className={`text-[24px] ${item.color}`}>{item.icon}</span>
            </div>
            <span className="min-h-6 text-center text-[9px] leading-tight text-gray-700">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Menu;