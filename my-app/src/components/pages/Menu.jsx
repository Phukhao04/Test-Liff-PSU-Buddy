import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '@/contexts/Context';
import { TbArrowUpRight } from 'react-icons/tb'

const menuCards = [
  {
    title: { th: 'ชั่วโมงกิจกรรม', en: 'Activity Hours' },
    path: '/student',
  },
  {
    title: { th: 'ทุนการศึกษา', en: 'Scholarship' },
    path: '/scholarship',
  },
  {
    title: { th: 'ระบบทดสอบ\nสมรรถนะ', en: 'Competency\nTest' },
    path: '/competency',
  },
  {
    title: { th: 'ฉุกเฉิน', en: 'Emergency' },
    path: '/emergency',
  },
  {
    title: { th: 'รวมลิงก์', en: 'Links' },
    path: '/links',
  },
  {
    title: { th: 'หอพัก', en: 'Dormitory' },
    path: '/dormitory',
  },
];

const Menu = () => {
  const { language } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <div className="grid grid-cols-2 gap-4 px-4 pt-5">
        {menuCards.map((card, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => navigate(card.path)}
              className="relative w-full min-h-[130px] p-4 text-left active:scale-[0.97] transition-transform"
              style={{ background: 'none', border: 'none' }}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.10))' }}
              >
                <path
                  d="M15,0 L62,0 A38,38 0 0,0 100,38 L100,85 Q100,100 85,100 L15,100 Q0,100 0,85 L0,15 Q0,0 15,0 Z"
                  fill="#dfe7f7"
                />
              </svg>

              <div className="relative z-10 mt-6">
                <h2 className="whitespace-pre-line text-[14px] font-semibold leading-snug text-[#1a2a44] max-w-[55%]">
                  {card.title[language]}
                </h2>
              </div>
            </button>

            {/* ปุ่ม ↗ ลอยมุมขวาบน */}
            <div
              className="absolute flex items-center justify-center rounded-full bg-[#b8cfe8] pointer-events-none z-10"
              style={{ width: 40, height: 40, top: -8, right: -8 }}
            >
              <TbArrowUpRight size={20} color="#3a5a80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;