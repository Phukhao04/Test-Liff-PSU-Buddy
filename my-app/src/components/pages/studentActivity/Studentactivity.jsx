import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { getActivityData } from '@/services/activity.service';
import Context from '@/contexts/Context';
import spider from '@/assets/img/spider.png';

import { FaHeart, FaStar, FaChevronRight } from 'react-icons/fa';

import RadarCharts from '@/components/modules/studentActivity/RadarCharts';
import ActivityItem from '@/components/modules/studentActivity/ActivityItem';
import ProgressBar from '@/components/modules/studentActivity/ProgressBar';

const TABS = [
  { key: 'all', label: { th: 'ทั้งหมด', en: 'All' } },
  { key: 'core', label: { th: 'สมรรถนะ', en: 'Competency' } },
  { key: 'elective', label: { th: 'ความสนใจ', en: 'Electives' } },
];

const StudentActivity = () => {
  const { language } = useContext(Context);

  const [showChart, setShowChart] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [activityData, setActivityData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => { fetchActivityData(); }, [language]);
  useEffect(() => { setShowAll(false); }, [activeTab]);

  const fetchActivityData = async () => {
    try {
      setFetchError(null);
      const data = await getActivityData();
      const formattedEvents = (data.events || []).map((item) => {
        const isCore = item.hour?.title === 'competencies';
        return {
          id: item._id,
          title: item.title?.[language] || item.title?.th || '-',
          tag: isCore ? (language === 'th' ? 'สมรรถนะ' : 'Competency') : (language === 'th' ? 'สนใจ' : 'Elective'),
          tagColor: isCore ? 'bg-[#89CEFF]' : 'bg-[#FFC0C1]',
          type: isCore ? 'core' : 'elective',
          hours: item.hour?.total || 0,
          date: item.start ? new Date(item.start).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
          competencyValues: item.hour?.competencies || [],
          electiveValues: item.hour?.electives || [],
        };
      });
      const coreHours = formattedEvents.filter(i => i.type === 'core').reduce((s, i) => s + i.hours, 0);
      const electiveHours = formattedEvents.filter(i => i.type === 'elective').reduce((s, i) => s + i.hours, 0);
      const competencyTotals = Array(9).fill(0);
      const electiveTotals = Array(7).fill(0);
      formattedEvents.forEach(item => {
        item.competencyValues.forEach((v, idx) => { competencyTotals[idx] += v; });
        item.electiveValues.forEach((v, idx) => { electiveTotals[idx] += v; });
      });
      setActivityData({ ...data, events: formattedEvents, coreHours, electiveHours, competencyTotals, electiveTotals });
    } catch (err) {
      console.error(err);
      setFetchError(language === 'th' ? 'โหลดข้อมูลไม่สำเร็จ' : 'Failed to load data');
    }
  };

  const filteredActivities = activityData?.events?.filter(i => activeTab === 'all' || i.type === activeTab) || [];
  const displayedActivities = showAll ? filteredActivities : filteredActivities.slice(0, 5);

  return (
    <div className="min-h-screen bg-white px-4 pb-32 pt-5">

      {/* TITLE */}
      <p className="mb-3 text-[22px] font-bold text-gray-900">
        {language === 'th' ? 'กิจกรรมนักศึกษา' : 'Student Activity'}
      </p>

      {fetchError && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-[13px] text-red-500">{fetchError}</p>
      )}

      <div className="relative mb-14">

        <div className="relative z-10 rounded-[24px] bg-[#F6F9FE] p-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
          <p className="mb-3 text-[12px] font-semibold text-psu-deep-blue-500">
            {language === 'th' ? 'ชั่วโมงกิจกรรม' : 'Activity Hours'}
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaStar size={10} className="text-[#4B8CD2]" />
                  <p className="text-[11px] text-gray-600">{language === 'th' ? 'กิจกรรมเสริมสร้างสมรรถนะ' : 'Competency'}</p>
                </div>
                <p className="text-[11px] font-semibold text-[#4B8CD2]">{activityData?.coreHours || 0}/{activityData?.hrsTarget?.competencies || 50}</p>
              </div>
              <ProgressBar value={((activityData?.coreHours || 0) / (activityData?.hrsTarget?.competencies || 50)) * 100} color="bg-[#4B8CD2]" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaHeart size={10} className="text-[#F33939]" />
                  <p className="text-[11px] text-gray-600">{language === 'th' ? 'กิจกรรมเข้าร่วมตามความสนใจ' : 'Electives'}</p>
                </div>
                <p className="text-[11px] font-semibold text-[#F33939]">{activityData?.electiveHours || 0}/{activityData?.hrsTarget?.electives || 50}</p>
              </div>
              <ProgressBar value={((activityData?.electiveHours || 0) / (activityData?.hrsTarget?.electives || 50)) * 100} color="bg-[#FF3939]" />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-12 right-4 z-0">
          <motion.button
            onClick={() => setShowChart(prev => !prev)}
            animate={!showChart ? { y: [0, 4, 0] } : { y: 0 }}
            transition={!showChart ? { repeat: Infinity, duration: 2, ease: 'easeInOut' } : {}}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
          >
            <img
              src={spider}
              alt="spider"
              className="w-14 h-14 object-contain drop-shadow-md"
            />
          </motion.button>
        </div>

      </div>

      {/* CHART slide down */}
      <AnimatePresence>
        {showChart && (
          <motion.div
            key="chart"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden mb-4 mt-2"
          >
            <RadarCharts
              language={language}
              competencyData={activityData?.competencyTotals || []}
              electiveData={activityData?.electiveTotals || []}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showChart && <div className="mt-4" />}

      {/* HISTORY */}
      <p className="mb-2 text-[15px] font-bold text-gray-900">
        {language === 'th' ? 'ประวัติกิจกรรม' : 'Activity History'}
      </p>

      <div className="mb-3 flex gap-2 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition ${activeTab === tab.key ? 'bg-[#4B8CD2] text-white' : 'bg-gray-100 text-gray-500'
              }`}
          >
            {tab.label[language]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredActivities.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-gray-400">
            {language === 'th' ? 'ไม่มีกิจกรรมในหมวดนี้' : 'No activities in this category'}
          </p>
        ) : (
          <>
            {displayedActivities.map(item => (
              <ActivityItem key={item.id} item={item} language={language} />
            ))}
            {!showAll && filteredActivities.length > 5 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white py-3 text-[13px] font-medium text-psu-deep-blue-500 shadow-sm transition active:scale-95"
              >
                {language === 'th' ? 'ดูทั้งหมด' : 'See all'}
                <FaChevronRight size={11} />
              </button>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default StudentActivity;