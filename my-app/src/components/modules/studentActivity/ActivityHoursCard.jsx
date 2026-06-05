// ActivityHoursCard.jsx
import { motion } from 'framer-motion';
import { FaStar, FaHeart } from 'react-icons/fa';
import ProgressBar from './ProgressBar';
import spider from '@/assets/img/spider.png';

const ActivityHoursCard = ({ activityData, language, primary, showChart, onToggleChart }) => (
  <div className="relative mb-14">
    <div className="relative z-10 rounded-[24px] bg-[#F6F9FE] p-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <p className="mb-3 text-sm font-semibold" style={{ color: primary }}>
        {language === 'th' ? 'ชั่วโมงกิจกรรม' : 'Activity Hours'}
      </p>
      <div className="space-y-3">
        {/* Core */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaStar size={10} style={{ color: primary }} />
              <p className="text-xs text-gray-600">
                {language === 'th' ? 'กิจกรรมเสริมสร้างสมรรถนะ' : 'Competency'}
              </p>
            </div>
            <p className="text-xs font-semibold" style={{ color: primary }}>
              {activityData?.coreHours || 0}/{activityData?.hrsTarget?.competencies || 50}
            </p>
          </div>
          <ProgressBar
            value={((activityData?.coreHours || 0) / (activityData?.hrsTarget?.competencies || 50)) * 100}
            color={primary}
          />
        </div>
        {/* Elective */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaHeart size={10} className="text-[#F33939]" />
              <p className="text-xs text-gray-600">
                {language === 'th' ? 'กิจกรรมเข้าร่วมตามความสนใจ' : 'Electives'}
              </p>
            </div>
            <p className="text-xs font-semibold text-[#F33939]">
              {activityData?.electiveHours || 0}/{activityData?.hrsTarget?.electives || 50}
            </p>
          </div>
          <ProgressBar
            value={((activityData?.electiveHours || 0) / (activityData?.hrsTarget?.electives || 50)) * 100}
            color="#FF3939"
          />
        </div>
      </div>
    </div>

    {/* แมงมุม */}
    <div className="absolute -bottom-12 right-4 z-0">
      <motion.button
        onClick={onToggleChart}
        animate={!showChart ? { y: [0, 4, 0] } : { y: 0 }}
        transition={!showChart ? { repeat: Infinity, duration: 2, ease: 'easeInOut' } : {}}
        whileTap={{ scale: 0.9 }}
        className="focus:outline-none"
      >
        <img src={spider} alt="spider" className="w-14 h-14 object-contain drop-shadow-md" />
      </motion.button>
    </div>
  </div>
);

export default ActivityHoursCard;