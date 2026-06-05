import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import liff from '@line/liff';

import Context from '@/contexts/Context';
import MenuCard from '@/components/modules/Button/MenuButton';

import ActivityIcon   from '@/assets/icons/Activity.svg?react';
import ChartIcon      from '@/assets/icons/Chart.svg?react';
import HomeIcon       from '@/assets/icons/home.svg?react';
import VectorIcon     from '@/assets/icons/Vector.svg?react';
import ScolarshipIcon from '@/assets/icons/scolarship.svg?react';
import EmergencyIcon  from '@/assets/icons/emergency.svg?react';

const menuCards = [
  {
    title: { th: 'ชั่วโมงกิจกรรม',      en: 'Activity Hours'  },
    path: '/student',
    icon: <ActivityIcon   className="w-10 h-10" />,
  },
  {
    title: { th: 'ทุนการศึกษา',          en: 'Scholarship'     },
    path: '/scholarship',
    icon: <ScolarshipIcon className="w-10 h-10" />,
  },
  {
    title: { th: 'ระบบทดสอบ\nสมรรถนะ', en: 'Competency\nTest' },
    path: '/competency',
    icon: <ChartIcon      className="w-10 h-10" />,
  },
  {
    title: { th: 'ฉุกเฉิน',              en: 'Emergency'       },
    path: '/emergency',
    icon: <EmergencyIcon  className="w-10 h-10" />,
  },
  {
    title: { th: 'หอพัก',               en: 'Dormitory'       },
    path: 'https://dorm.psu.ac.th/system',
    external: true,
    icon: <HomeIcon       className="w-10 h-10" />,
  },
  {
    title: { th: 'รวมช่องทางเรียน',     en: 'Learning Links'  },
    path: '/learning-links',
    icon: <VectorIcon     className="w-10 h-10" />,
  },
];

const Menu = () => {
  const { language } = useContext(Context);
  const navigate = useNavigate();

  const handleClick = (card) => {
    if (card.external) {
      liff.openWindow({ url: card.path, external: true });
      return;
    }
    navigate(card.path);
  };

  return (
    <div
      className="min-h-screen pb-24 px-4"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-[32px] font-bold text-[#1c1c1c]">
          {language === 'th' ? 'บริการ' : 'Services'}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-7">
        {menuCards.map((card, index) => (
          <MenuCard
            key={index}
            id={index}
            label={card.title[language]}
            onClick={() => handleClick(card)}
          >
            {card.icon}
          </MenuCard>
        ))}
      </div>
    </div>
  );
};

export default Menu;