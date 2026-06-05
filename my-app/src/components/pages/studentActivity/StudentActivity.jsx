import { useContext, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { getActivityData } from '@/services/activity.service';
import Context from '@/contexts/Context';

import { FaChevronRight } from 'react-icons/fa';

import RadarCharts      from '@/components/modules/studentActivity/RadarCharts';
import ActivityItem     from '@/components/modules/studentActivity/ActivityItem';
import ActivityHoursCard from '@/components/modules/studentActivity/ActivityHoursCard';
import ActivityTabs     from '@/components/modules/studentActivity/ActivityTabs';

const formatEvent = (item) => {
  const isCore = item.hour?.title === 'competencies';
  return {
    id:               item._id,
    title:            item.title || {},
    tag:              { th: isCore ? 'สมรรถนะ' : 'สนใจ', en: isCore ? 'Competency' : 'Elective' },
    tagColor:         isCore ? 'bg-[#89CEFF]' : 'bg-[#FFC0C1]',
    type:             isCore ? 'core' : 'elective',
    hours:            item.hour?.total || 0,
    date:             item.start ? new Date(item.start) : null,
    competencyValues: item.hour?.competencies || [],
    electiveValues:   item.hour?.electives    || [],
  };
};

const StudentActivity = () => {
  const { language, character } = useContext(Context);
  const primary = character?.color ?? '#4B8CD2';

  const [showChart,  setShowChart]  = useState(false);
  const [activeTab,  setActiveTab]  = useState('all');
  const [showAll,    setShowAll]    = useState(false);
  const [rawData,    setRawData]    = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setFetchError(null);
        const data = await getActivityData();
        setRawData(data);
      } catch (err) {
        console.error(err);
        setFetchError('error');
      }
    };
    fetchActivityData();
  }, []);

  useEffect(() => { setShowAll(false); }, [activeTab]);

  const activityData = useMemo(() => {
    if (!rawData) return null;
    const events = (rawData.events || [])
      .map(formatEvent)
      .sort((a, b) => (b.date || 0) - (a.date || 0));

    const coreHours     = events.filter(i => i.type === 'core').reduce((s, i) => s + i.hours, 0);
    const electiveHours = events.filter(i => i.type === 'elective').reduce((s, i) => s + i.hours, 0);

    const competencyTotals = Array(9).fill(0);
    const electiveTotals   = Array(7).fill(0);
    events.forEach(item => {
      item.competencyValues.forEach((v, idx) => { competencyTotals[idx] += v; });
      item.electiveValues.forEach((v, idx)   => { electiveTotals[idx]   += v; });
    });

    return { ...rawData, events, coreHours, electiveHours, competencyTotals, electiveTotals };
  }, [rawData]);

  const localizedEvents = useMemo(() => {
    if (!activityData?.events) return [];
    return activityData.events.map(item => ({
      ...item,
      title: item.title?.[language] || item.title?.th || '-',
      tag:   item.tag[language],
      date:  item.date
        ? item.date.toLocaleDateString(
            language === 'th' ? 'th-TH' : 'en-US',
            { day: 'numeric', month: 'short', year: 'numeric' },
          )
        : '-',
    }));
  }, [activityData, language]);

  const filteredActivities  = localizedEvents.filter(i => activeTab === 'all' || i.type === activeTab);
  const displayedActivities = showAll ? filteredActivities : filteredActivities.slice(0, 5);

  return (
    <div
      className="min-h-screen px-4 pb-32 pt-5"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* TITLE */}
      <p className="mb-3 text-[22px] font-bold text-gray-900">
        {language === 'th' ? 'กิจกรรมนักศึกษา' : 'Student Activity'}
      </p>

      {fetchError && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-base text-red-500">
          {language === 'th' ? 'โหลดข้อมูลไม่สำเร็จ' : 'Failed to load data'}
        </p>
      )}

      {/* HOURS CARD + แมงมุม */}
      <ActivityHoursCard
        activityData={activityData}
        language={language}
        primary={primary}
        showChart={showChart}
        onToggleChart={() => setShowChart(prev => !prev)}
      />

      {/* CHART */}
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
              electiveData={activityData?.electiveTotals    || []}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showChart && <div className="mt-4" />}

      {/* HISTORY */}
      <p className="mb-2 text-md font-bold text-gray-900">
        {language === 'th' ? 'ประวัติกิจกรรม' : 'Activity History'}
      </p>

      {/* TABS */}
      <ActivityTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        primary={primary}
      />

      {/* LIST */}
      <div className="space-y-2">
        {filteredActivities.length === 0 ? (
          <p className="py-6 text-center text-base text-gray-400">
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
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white py-3 text-base font-medium shadow-sm transition active:scale-95"
                style={{ color: primary }}
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