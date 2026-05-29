import { useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

const COMPETENCY_LABELS_TH = [
  'ทักษะการใช้ชีวิต',
  'ศตวรรษที่ 21',
  'การมีส่วนร่วม',
  'ภาวะผู้นำ',
  'ภาษาต่างประเทศ',
  'ผู้ประกอบการ',
  'วิชาชีพ',
  'ดิจิทัล',
  'ซื่อสัตย์',
];

const COMPETENCY_LABELS_EN = [
  'Life',
  '21st Century',
  'Participation',
  'Leadership',
  'Language',
  'Entrepreneur',
  'Professional',
  'Digital',
  'Integrity',
];

const ELECTIVE_LABELS_TH = [
  'วิชาการ',
  'ประชาธิปไตย',
  'มหาวิทยาลัย',
  'ศิลปวัฒนธรรม',
  'สุขภาพ',
  'นันทนาการ',
  'พหุวัฒนธรรม',
];

const ELECTIVE_LABELS_EN = [
  'Academic',
  'Democracy',
  'University',
  'Culture',
  'Health',
  'Recreation',
  'Multicultural',
];

const RadarCharts = ({
  language = 'th',
  competencyData = [],
  electiveData = [],
}) => {
  const [activeChart, setActiveChart] = useState('core');

  const isCore = activeChart === 'core';

  const competencyChartData = competencyData.map((value, index) => ({
    subject:
      language === 'th'
        ? COMPETENCY_LABELS_TH[index]
        : COMPETENCY_LABELS_EN[index],
    value,
  }));

  const electiveChartData = electiveData.map((value, index) => ({
    subject:
      language === 'th'
        ? ELECTIVE_LABELS_TH[index]
        : ELECTIVE_LABELS_EN[index],
    value,
  }));

  const chartData = isCore
    ? competencyChartData
    : electiveChartData;

  const fillColor = isCore ? '#5BA4E5' : '#ef4444';
  const gridColor = isCore ? '#bfdbfe' : '#fecaca';

  return (
    <div
      className={`mx-1 mb-4 overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        isCore
          ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-white'
          : 'bg-gradient-to-br from-red-50 via-rose-50 to-white'
      }`}
    >
      {/* Header */}
      <div className="pt-5 text-center">
        <h2 className="text-base font-bold text-gray-800">
          {isCore
            ? language === 'th'
              ? 'สมรรถนะ'
              : 'Student Competency'
            : language === 'th'
            ? 'ความสนใจ'
            : 'Electives'}
        </h2>
      </div>

      {/* Chart */}
      <div className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 24,
              bottom: 10,
              left: 24,
            }}
          >
            <PolarGrid
              stroke={gridColor}
              strokeWidth={1.5}
            />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: 9,
                fill: '#6b7280',
              }}
            />

            <Radar
              dataKey="value"
              stroke={fillColor}
              fill={fillColor}
              fillOpacity={0.45}
              strokeWidth={2.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveChart('core')}
            className={`flex-1 rounded-2xl py-2.5 text-xs font-semibold transition-all duration-200 ${
              isCore
                ? 'bg-[#003c71] text-white shadow-md'
                : 'bg-white/70 text-gray-400'
            }`}
          >
            ★ {language === 'th' ? 'สมรรถนะ' : 'Competency'}
          </button>

          <button
            onClick={() => setActiveChart('elective')}
            className={`flex-1 rounded-2xl py-2.5 text-xs font-semibold transition-all duration-200 ${
              !isCore
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white/70 text-gray-400'
            }`}
          >
            ♥ {language === 'th' ? 'ความสนใจ' : 'Electives'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default RadarCharts;