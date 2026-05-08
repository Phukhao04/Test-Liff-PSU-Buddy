import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Context from '@/contexts/Context';
import dow from '@/assets/img/dow.png';

import {
  FaAngleDown,
  FaCalendarAlt,
  FaChevronRight,
  FaClipboardList,
  FaDownload,
  FaHeart,
  FaHistory,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

const TABS = [
  { key: 'all',      label: { th: 'ทั้งหมด',      en: 'All'        } },
  { key: 'core',     label: { th: 'สมรรถนะ',      en: 'Competency' } },
  { key: 'elective', label: { th: 'เลือกเข้าร่วม', en: 'Interest'   } },
];

const RADAR_DATA_COMPETENCY = [
  { subject: 'ทักษะการใช้ชีวิตอย่างมีความสุข', value: 80 },
  { subject: 'ทักษะแห่งศตวรรษที่ 21',         value: 60 },
  { subject: 'ทักษะการมีส่วนร่วม',             value: 40 },
  { subject: 'ทักษะภาวะผู้นำ',                 value: 70 },
  { subject: 'ทักษะภาษาต่างประเทศ',            value: 55 },
  { subject: 'ทักษะการเป็นผู้ประกอบการ',       value: 55 },
  { subject: 'ทักษะวิชาชีพ',                   value: 55 },
  { subject: 'ทักษะดิจิทัลและเทคโนโลยี',       value: 55 },
  { subject: 'คุณลักษณะความซื่อสัตย์',         value: 55 },
];

const RADAR_DATA_INTEREST = [
  { subject: 'วิชาการ',              value: 30 },
  { subject: 'ประชาธิปไตย',          value: 75 },
  { subject: 'ภูมิใจในมหาวิทยาลัย',  value: 60 },
  { subject: 'ศิลปวัฒนธรรมและศาสนา', value: 45 },
  { subject: 'สุขภาพกายและใจ',       value: 80 },
  { subject: 'ความสุขและนันทนาการ',  value: 80 },
  { subject: 'สังคมพหุวัฒนธรรม',     value: 80 },
];

const MOCK_ACTIVITIES = [
  { id: 1, title: 'CTRL + O OPEN THE DOOR',    tag: 'สมรรถนะ',      tagColor: 'bg-psu-deep-blue-500', date: '14 พ.ย. 2568', hours: 6,  type: 'core'     },
  { id: 2, title: 'ค่ายอาสาพัฒนาชนบท',         tag: 'เลือกเข้าร่วม', tagColor: 'bg-red-400',           date: '12 ต.ค. 2566', hours: 12, type: 'elective' },
  { id: 3, title: 'อบรมทักษะดิจิทัลเบื้องต้น', tag: 'เลือกเข้าร่วม', tagColor: 'bg-red-400',           date: '05 ก.ค. 2566', hours: 3,  type: 'elective' },
  { id: 4, title: 'CTRL + N New Character',    tag: 'สมรรถนะ',      tagColor: 'bg-psu-deep-blue-500', date: '14 ก.ย. 2568', hours: 6,  type: 'core'     },
];

const SUB_MENU_ITEMS = [
  { key: 'register', icon: <FaCalendarAlt size={18} />, label: { th: 'ติดตามสถานะ\nโครงการ', en: 'Track\nProject'      }, path: '/student/register' },
  { key: 'search',   icon: <FaSearch size={18} />,      label: { th: 'จองห้องประชุม',         en: 'Book\nMeeting Room' }, path: '/student/search'   },
  { key: 'check',    icon: <FaClipboardList size={18} />, label: { th: 'แจ้งซ่อมพัสดุ',       en: 'Report\nRepair'     }, path: '/student/check'    },
  { key: 'history',  icon: <FaHistory size={18} />,     label: { th: 'ยืม-คืนพัสดุ',          en: 'Borrow-\nReturn'    }, path: '/student/history'  },
];

const RadarCharts = ({ language }) => (
  <div className="mb-6 grid grid-cols-2 gap-3">
    <div className="rounded-2xl bg-white p-2 shadow-sm">
      <p className="mb-1 text-center text-xs font-semibold text-psu-deep-blue-500">
        {language === 'th' ? 'กิจกรรมเสริมสร้างสมรรถนะ' : 'Competency'}
      </p>
      <ResponsiveContainer width="100%" height={140}>
        <RadarChart data={RADAR_DATA_COMPETENCY}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 7 }} />
          <Radar dataKey="value" stroke="#003c71" fill="#003c71" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>

    <div className="rounded-2xl bg-white p-2 shadow-sm">
      <p className="mb-1 text-center text-xs font-semibold text-psu-deep-blue-500">
        {language === 'th' ? 'กิจกรรมเลือกเข้าร่วม' : 'Interest'}
      </p>
      <ResponsiveContainer width="100%" height={140}>
        <RadarChart data={RADAR_DATA_INTEREST}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 7 }} />
          <Radar dataKey="value" stroke="#e53e3e" fill="#e53e3e" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ProfileCard = ({ theUser, lineUser, language }) => (
  <section className="bg-gray-50 px-4 pb-6 pt-5">
    <div className="flex items-center gap-3 rounded-2xl bg-psu-sritrang-100 px-4 py-4 shadow-sm">
      <div className="relative shrink-0">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-psu-deep-blue-300">
          {lineUser?.pictureUrl && (
            <img src={lineUser.pictureUrl} alt="avatar" className="h-full w-full object-cover" />
          )}
        </div>
        {theUser?.isActivityLeader && (
          <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] shadow-md">
            👑
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-psu-deep-blue-500">
          {theUser?.name?.[language] ?? '-'}
        </p>
        <p className="text-[13px] text-psu-deep-blue-400">{theUser?.psuId ?? '-'}</p>
        <p className="truncate text-[11px] text-psu-deep-blue-300">
          {language === 'th' ? 'คณะ' : 'Faculty'}:{' '}
          {theUser?.facName?.[language] ?? theUser?.facName?.th ?? '-'}
        </p>
        <p className="truncate text-[11px] text-psu-deep-blue-300">
          {theUser?.programName?.[language] ?? theUser?.programName?.th ?? '-'}
        </p>
        {theUser?.isActivityLeader && theUser?.activityRole && (
          <span className="mt-0.5 inline-block rounded-full border border-yellow-400 bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
            {theUser.activityRole[language] ?? theUser.activityRole.th}
          </span>
        )}
      </div>
    </div>
  </section>
);

const ProgressBar = ({ value, color }) => (
  <div className="h-1.5 w-full rounded-full bg-gray-200">
    <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

const ActivityItem = ({ item, language }) => (
  <button className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition active:scale-95">
    <div className="flex-1 text-left">
      <p className="line-clamp-1 text-[13px] font-semibold text-gray-900">{item.title}</p>
      <p className="mt-0.5 text-[11px] text-gray-400">
        {item.date} • {item.hours} {language === 'th' ? 'ชม.' : 'hrs.'}
      </p>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${item.tagColor}`}>
        {item.tag}
      </span>
      <FaChevronRight size={11} className="text-gray-300" />
    </div>
  </button>
);

const SubMenuItem = ({ item, language, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 transition active:scale-95">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-psu-sritrang-100 text-psu-deep-blue-500">
      {item.icon}
    </div>
    <span className="whitespace-pre-line text-center text-[10px] leading-tight text-gray-600">
      {item.label[language]}
    </span>
  </button>
);

const StudentActivity = () => {
  const { language, theUser, lineUser } = useContext(Context);
  const navigate = useNavigate();

  const [showChart, setShowChart] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredActivities = MOCK_ACTIVITIES.filter(
    (item) => activeTab === 'all' || item.type === activeTab,
  );

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      <ProfileCard theUser={theUser} lineUser={lineUser} language={language} />

      <div className="px-4 pb-32">
        {/* Progress Card */}
        <p className="mb-2 text-[15px] font-bold text-gray-900">
          {language === 'th' ? 'ชั่วโมงกิจกรรม' : 'Activity Hours'}
        </p>

        <div className="relative mb-8 rounded-2xl bg-psu-sritrang-100 p-4 pb-6">
          <p className="mb-3 text-[12px] font-semibold text-psu-deep-blue-500">
            {language === 'th' ? 'ความคืบหน้ากิจกรรม' : 'Activity Progress'}
          </p>

          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaShieldAlt size={10} className="text-psu-deep-blue-500" />
                  <p className="text-[11px] text-gray-600">
                    {language === 'th' ? 'กิจกรรมเสริมสร้างสมรรถนะ' : 'Character Building'}
                  </p>
                </div>
                <p className="text-[11px] font-semibold text-psu-deep-blue-500">40/50</p>
              </div>
              <ProgressBar value={80} color="bg-psu-deep-blue-500" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaHeart size={10} className="text-red-400" />
                  <p className="text-[11px] text-gray-600">
                    {language === 'th' ? 'กิจกรรมเลือกเข้าร่วม' : 'Interest Activities'}
                  </p>
                </div>
                <p className="text-[11px] font-semibold text-red-500">25/50</p>
              </div>
              <ProgressBar value={50} color="bg-red-400" />
            </div>
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <button
              onClick={() => setShowChart((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-md transition active:scale-95"
            >
              <span className={`transition-transform duration-300 ${showChart ? 'rotate-180' : ''}`}>
                <FaAngleDown />
              </span>
            </button>
          </div>
        </div>

        {showChart && <RadarCharts language={language} />}

        {/* Download Transcript */}
        <div
          className="mb-5 flex flex-col overflow-hidden rounded-2xl bg-cover bg-center px-4 py-4"
          style={{ backgroundImage: `url(${dow})` }}
        >
          <p className="text-[11px] text-psu-deep-blue-400">
            {language === 'th' ? 'ดาวน์โหลด' : 'Download'}
          </p>
          <p className="text-[14px] font-semibold text-psu-deep-blue-500">
            {language === 'th' ? 'ใบประมวลผลกิจกรรมนักศึกษา' : 'Student Activity Transcript'}
          </p>
          <button className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-psu-andaman-blue-500 px-3 py-1.5 text-[11px] font-semibold text-white transition active:scale-95">
            <FaDownload size={10} />
            {language === 'th' ? 'ดาวน์โหลดเลย' : 'Download'}
          </button>
        </div>

        {/* Activity History */}
        <p className="mb-2 text-[15px] font-bold text-gray-900">
          {language === 'th' ? 'ประวัติกิจกรรม' : 'Activity History'}
        </p>

        {/* Tab Filter */}
        <div className="mb-3 flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition ${
                activeTab === tab.key
                  ? 'bg-psu-deep-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <div className="mb-6 space-y-2">
          {filteredActivities.length === 0 ? (
            <p className="py-6 text-center text-[13px] text-gray-400">
              {language === 'th' ? 'ไม่มีกิจกรรมในหมวดนี้' : 'No activities in this category'}
            </p>
          ) : (
            filteredActivities.map((item) => (
              <ActivityItem key={item.id} item={item} language={language} />
            ))
          )}
        </div>

        {/* Sub Menu — เฉพาะนักกิจกรรม */}
        {theUser?.isActivityLeader && (
          <>
            <p className="mb-1 text-[13px] font-semibold text-gray-700">
              {language === 'th' ? 'เมนูสำหรับนักกิจกรรม' : 'Activity Menu'}
            </p>
            <p className="mb-3 text-[11px] text-gray-400">
              {language === 'th'
                ? 'เมนูพิเศษเฉพาะนักกิจกรรม / กรรมการ / ผู้ดูแลโครงการ'
                : 'Special menu for activity members / committees / project supervisors'}
            </p>
            <div className="grid grid-cols-4 gap-3">
              {SUB_MENU_ITEMS.map((item) => (
                <SubMenuItem
                  key={item.key}
                  item={item}
                  language={language}
                  onClick={() => navigate(item.path)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentActivity;