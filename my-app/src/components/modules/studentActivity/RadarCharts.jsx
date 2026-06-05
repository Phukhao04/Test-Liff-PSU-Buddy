import { useState, useRef } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from 'recharts';

const COMPETENCY_LABELS_TH = [
  'ทักษะชีวิต', 'ศตวรรษ 21', 'มีส่วนร่วม', 'ผู้นำ', 'ภาษา',
  'ผู้ประกอบการ', 'วิชาชีพ', 'ดิจิทัล', 'ซื่อสัตย์',
];
const COMPETENCY_LABELS_EN = [
  'Life', '21st Century', 'Participation', 'Leadership', 'Language',
  'Entrepreneur', 'Professional', 'Digital', 'Integrity',
];
const ELECTIVE_LABELS_TH = [
  'วิชาการ', 'ประชาธิปไตย', 'มหาวิทยาลัย', 'ศิลปวัฒนธรรม',
  'สุขภาพ', 'นันทนาการ', 'พหุวัฒนธรรม',
];
const ELECTIVE_LABELS_EN = [
  'Academic', 'Democracy', 'University', 'Culture',
  'Health', 'Recreation', 'Multicultural',
];

const BORDER_RADIUS = 33;
const SWIPE_THRESHOLD = 50;

const RadarCharts = ({
  language = 'th',
  competencyData = [],
  electiveData = [],
}) => {
  const [activeChart, setActiveChart] = useState('core');
  const touchStartX = useRef(null);
  const isCore = activeChart === 'core';

  const competencyChartData = competencyData.map((value, index) => ({
    subject: language === 'th' ? COMPETENCY_LABELS_TH[index] : COMPETENCY_LABELS_EN[index],
    value,
  }));
  const electiveChartData = electiveData.map((value, index) => ({
    subject: language === 'th' ? ELECTIVE_LABELS_TH[index] : ELECTIVE_LABELS_EN[index],
    value,
  }));

  const chartData = isCore ? competencyChartData : electiveChartData;
  const fillColor = isCore ? '#5BA4E5' : '#ef4444';
  const gridColor = isCore ? '#bfdbfe' : '#fecaca';

  // Back card color changes with active chart
  const backCardBg = isCore
    ? 'linear-gradient(145deg, #60a5fa 0%, #3b82f6 55%, #2563eb 100%)'
    : 'linear-gradient(145deg, #fca5a5 0%, #ef4444 55%, #dc2626 100%)';

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -SWIPE_THRESHOLD && isCore) setActiveChart('elective');
    if (deltaX > SWIPE_THRESHOLD && !isCore) setActiveChart('core');
    touchStartX.current = null;
  };

  // Also support mouse drag for desktop testing
  const mouseStartX = useRef(null);
  const handleMouseDown = (e) => { mouseStartX.current = e.clientX; };
  const handleMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    if (deltaX < -SWIPE_THRESHOLD && isCore) setActiveChart('elective');
    if (deltaX > SWIPE_THRESHOLD && !isCore) setActiveChart('core');
    mouseStartX.current = null;
  };

  return (
    <div className="mx-3 mb-4">
      <div className="relative" style={{ paddingTop: 20, paddingBottom: 4 }}>

        {/* Back card */}
        <div
          className="absolute inset-x-0"
          style={{
            top: 20,
            bottom: 4,
            marginLeft: 4,
            marginRight: 4,
            borderRadius: BORDER_RADIUS,
            transform: 'rotate(-4.4deg)',
            background: backCardBg,
            transition: 'background 0.4s ease',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: BORDER_RADIUS,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.3) 0%, transparent 55%)',
            }}
          />
        </div>

        {/* Front card — swipeable */}
        <div
          className="relative overflow-hidden select-none"
          style={{
            borderRadius: BORDER_RADIUS,
            transform: 'rotate(-0.87deg)',
            border: '1px solid rgba(255,255,255,0.95)',
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(30px) saturate(190%)',
            WebkitBackdropFilter: 'blur(30px) saturate(190%)',
            cursor: 'grab',
            touchAction: 'pan-y',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Top sheen */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: '45%',
              borderRadius: `${BORDER_RADIUS}px ${BORDER_RADIUS}px 0 0`,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.08) 70%, transparent 100%)',
              zIndex: 1,
            }}
          />
          <div
            className="absolute"
            style={{
              top: 2, left: 12, right: 12, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
              zIndex: 2,
            }}
          />

          <div className="relative flex flex-col" style={{ zIndex: 3 }}>
            <div
              className="absolute pointer-events-none"
              style={{
                top: -60,
                right: -60,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background:
                  isCore
                    ? 'radial-gradient(circle, rgba(96,165,250,0.35) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(239,68,68,0.35) 0%, transparent 70%)',
                zIndex: 1,
              }}
            />

            {/* Header */}
            <div className="pt-5 text-center">
              <h2
                className="text-base font-bold transition-all duration-300"
                style={{ color: isCore ? 'rgba(20,65,130,0.85)' : 'rgba(180,30,30,0.85)' }}
              >
                {isCore
                  ? (language === 'th' ? 'สมรรถนะ' : 'Student Competency')
                  : (language === 'th' ? 'ความสนใจ' : 'Electives')}
              </h2>
            </div>

            {/* Chart */}
            <div className="w-full flex justify-center px-2 pt-2 pb-3">
              <RadarChart
                width={280}
                height={220}
                data={chartData}
                margin={{ top: 10, right: 32, bottom: 10, left: 32 }}
              >
                <PolarGrid stroke={gridColor} strokeWidth={1.5} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 9, fill: isCore ? 'rgba(30,70,140,0.75)' : 'rgba(140,30,30,0.75)', fontWeight: 500 }}
                />
                <Radar
                  dataKey="value"
                  stroke={isCore ? '#1d4ed8' : '#b91c1c'}
                  fill={isCore ? '#3b82f6' : '#ef4444'}
                  fillOpacity={0.7}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: 'white', stroke: isCore ? '#1d4ed8' : '#b91c1c', strokeWidth: 2 }}
                />
                <PolarGrid
                  stroke={isCore ? '#93c5fd' : '#fca5a5'}
                  strokeWidth={1.8}
                />
              </RadarChart>
            </div>

            {/* Swipe indicator dots */}
            <div className="flex justify-center gap-1.5 pb-5">
              <div
                style={{
                  width: isCore ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: isCore ? '#003c71' : 'rgba(100,120,150,0.3)',
                  transition: 'all 0.3s ease',
                }}
              />
              <div
                style={{
                  width: !isCore ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: !isCore ? '#ef4444' : 'rgba(100,120,150,0.3)',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarCharts;


