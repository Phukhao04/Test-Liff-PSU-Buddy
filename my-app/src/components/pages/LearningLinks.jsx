import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '@/contexts/Context';
import MenuCard from '@/components/modules/Button/MenuButton';
import LMSicon from '@/assets/icons/LMS.png';
import SISicon from '@/assets/icons/SIS.png';
import LIBicon from '@/assets/icons/libx.png';
import MOOCicon from '@/assets/icons/mooc.png';

const links = [
  {
    id: 'lms',
    title: 'LMS',
    subtitle: { th: 'ระบบการเรียนการสอนออนไลน์', en: 'Learning Management System' },
    url: 'https://lms.psu.ac.th',
    icon: LMSicon,
  },
  {
    id: 'sis',
    title: 'SIS',
    subtitle: { th: 'ระบบสารสนเทศนักศึกษา', en: 'Student Information System' },
    url: 'https://sis.psu.ac.th',
    icon: SISicon,
  },
  {
    id: 'lib',
    title: 'PSU Lib',
    subtitle: { th: 'ห้องสมุดมหาวิทยาลัย', en: 'PSU Library' },
    url: 'https://library.psu.ac.th',
    icon: LIBicon,
  },
  {
    id: 'mooc',
    title: 'MOOC',
    subtitle: { th: 'คอร์สเรียนออนไลน์ PSU', en: 'PSU Online Courses' },
    url: 'https://mooc.psu.ac.th',
    icon: MOOCicon,
  },
];

const LearningLinks = () => {
  const { language } = useContext(Context);

  return (
    <div
      className="min-h-screen pb-24 px-4"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-[28px] font-bold text-[#1c1c1c]">
          {language === 'th' ? 'รวมช่องทางการเรียน' : 'Learning Links'}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-7">
        {links.map((link, index) => (
          <MenuCard
            key={link.id}
            id={`link-${index}`}
            label={link.title}
            onClick={() => window.open(link.url, '_blank')}
          >
            <div className="w-18 h-18 rounded-2xl flex items-center justify-center p-2">
              {link.icon
                ? <img src={link.icon} alt={link.title} className="w-full h-full object-contain" />
                : <p className="text-[12px] font-bold text-[#3a5a80]">{link.title}</p>
              }
            </div>
          </MenuCard>
        ))}
      </div>
    </div>
  );
};

export default LearningLinks;