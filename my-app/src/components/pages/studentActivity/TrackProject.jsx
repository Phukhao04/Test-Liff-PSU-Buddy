import { useContext, useState } from 'react';

import Context from '@/contexts/Context';
import project from '@/assets/img/project.png';

import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronRight,
  FaFileAlt,
  FaInbox,
  FaSearch,
  FaTrophy,
} from 'react-icons/fa';

const TABS = [
  { key: 'all',       label: { th: 'ทั้งหมด',         en: 'All'       }, count: 5 },
  { key: 'ongoing',   label: { th: 'กำลังดำเนินการ',  en: 'Ongoing'   }, count: 3 },
  { key: 'done',      label: { th: 'เสร็จสิ้น',        en: 'Done'      }, count: 1 },
  { key: 'cancelled', label: { th: 'ยกเลิก',           en: 'Cancelled' }, count: 1 },
];

const STATUS_CONFIG = {
  ongoing:   { label: { th: 'กำลังรับเรื่อง', en: 'Ongoing'   }, bg: 'bg-blue-100',   text: 'text-blue-600',   iconBg: 'bg-blue-100',   iconColor: 'text-blue-500',   step: 1  },
  new:       { label: { th: 'ใหม่',           en: 'New'       }, bg: 'bg-orange-100', text: 'text-orange-500', iconBg: 'bg-orange-100', iconColor: 'text-orange-400', step: 0  },
  done:      { label: { th: 'เสร็จสิ้น',      en: 'Done'      }, bg: 'bg-green-100',  text: 'text-green-600',  iconBg: 'bg-green-100',  iconColor: 'text-green-500',  step: 4  },
  cancelled: { label: { th: 'ยกเลิก',         en: 'Cancelled' }, bg: 'bg-red-100',    text: 'text-red-500',    iconBg: 'bg-red-100',    iconColor: 'text-red-400',    step: -1 },
};

const STEPS = [
  { key: 'submit',   icon: <FaFileAlt size={14} />,     label: { th: 'ยื่นเรื่อง', en: 'Submit'   } },
  { key: 'received', icon: <FaInbox size={14} />,        label: { th: 'รับเรื่อง', en: 'Received' } },
  { key: 'review',   icon: <FaSearch size={14} />,       label: { th: 'พิจารณา',   en: 'Review'   } },
  { key: 'approved', icon: <FaCheckCircle size={14} />,  label: { th: 'อนุมัติ',   en: 'Approved' } },
  { key: 'done',     icon: <FaTrophy size={14} />,       label: { th: 'สำเร็จ',    en: 'Done'     } },
];

const MOCK_PROJECTS = [
  { id: 1, type: 'ongoing',   status: 'ongoing',   progress: 60,  title: { th: 'โครงการพัฒนาทักษะดิจิทัลสำหรับนักศึกษา', en: 'Digital Skills Development Project' }, start: { th: 'ยื่นเมื่อ 12 พ.ย. 2569', en: 'Start 12 Nov 2026'   }, end: { th: 'อัพเดตล่าสุด 12 พ.ย. 2569', en: 'Updated 12 Nov 2026' } },
  { id: 2, type: 'ongoing',   status: 'ongoing',   progress: 40,  title: { th: 'โครงการพัฒนาทักษะดิจิทัลสำหรับนักศึกษา', en: 'Digital Skills Development Project' }, start: { th: 'ยื่นเมื่อ 12 พ.ย. 2569', en: 'Start 12 Nov 2026'   }, end: { th: 'อัพเดตล่าสุด 20 เม.ย. 2569', en: 'Updated 20 Apr 2026' } },
  { id: 3, type: 'cancelled', status: 'cancelled', progress: 20,  title: { th: 'โครงการพัฒนาทักษะดิจิทัลสำหรับนักศึกษา', en: 'Digital Skills Development Project' }, start: { th: 'ยื่นเมื่อ 12 พ.ย. 2568', en: 'Start 12 Nov 2025'   }, end: { th: 'อัพเดตล่าสุด 12 เม.ย. 2568', en: 'Updated 12 Apr 2025' } },
  { id: 4, type: 'done',      status: 'done',      progress: 100, title: { th: 'โครงการพัฒนาทักษะดิจิทัลสำหรับนักศึกษา', en: 'Digital Skills Development Project' }, start: { th: 'ยื่นเมื่อ 12 พ.ย. 2568', en: 'Start 12 Nov 2025'   }, end: { th: 'อัพเดตล่าสุด 12 เม.ย. 2568', en: 'Updated 12 Apr 2025' } },
  { id: 5, type: 'ongoing',   status: 'new',       progress: 5,   title: { th: 'โครงการพัฒนาทักษะดิจิทัลสำหรับนักศึกษา', en: 'Digital Skills Development Project' }, start: { th: 'ยื่นเมื่อ 12 พ.ย. 2569', en: 'Start 12 Nov 2026'   }, end: { th: 'อัพเดตล่าสุด 12 เม.ย. 2569', en: 'Updated 12 Apr 2026' } },
];

const StepIndicator = ({ step, index, currentStep, status, s, language }) => {
  const isCancelled = status === 'cancelled';
  const isDone      = currentStep >= 0 && index <= currentStep;
  const isActive    = index === currentStep;

  const circleBg  = isCancelled ? (index === 0 ? s.iconBg    : 'bg-gray-100')    : isDone ? s.iconBg    : 'bg-gray-100';
  const iconColor = isCancelled ? (index === 0 ? s.iconColor : 'text-gray-300') : isDone ? s.iconColor : 'text-gray-300';
  const labelColor = isCancelled ? (index === 0 ? s.text     : 'text-gray-300') : isDone ? 'text-psu-deep-blue-500' : 'text-gray-300';

  return (
    <div className="relative z-10 flex flex-col items-center gap-1">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${circleBg} ${
          isActive ? 'ring-2 ring-psu-deep-blue-200 ring-offset-1' : ''
        }`}
      >
        <span className={iconColor}>{step.icon}</span>
      </div>
      <span className={`text-[9px] font-medium ${labelColor}`}>
        {step.label[language]}
      </span>
    </div>
  );
};

const ProjectCard = ({ item, language }) => {
  const s = STATUS_CONFIG[item.status];

  return (
    <button className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition active:scale-95">
      {/* Top row */}
      <div className="flex items-start gap-3 px-4 pb-2 pt-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${s.iconBg} ${s.iconColor}`}>
          <FaFileAlt size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 pr-1 text-[13px] font-semibold text-gray-900">
            {item.title[language]}
          </p>
          <p className="mt-1 text-[10px] text-gray-400">{item.start[language]}</p>
          <p className="text-[10px] text-gray-400">{item.end[language]}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1 pt-0.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text}`}>
            {s.label[language]}
          </span>
          <FaChevronRight size={11} className="text-gray-300" />
        </div>
      </div>

      {/* Step indicators */}
      <div className="relative flex items-start justify-around px-5 pb-4 pt-1">
        <div className="absolute left-10 right-10 top-[18px] z-0 h-0.5 bg-gray-200" />
        {STEPS.map((step, i) => (
          <StepIndicator
            key={step.key}
            step={step}
            index={i}
            currentStep={s.step}
            status={item.status}
            s={s}
            language={language}
          />
        ))}
      </div>
    </button>
  );
};

const TrackProject = () => {
  const { language } = useContext(Context);
  const [activeTab, setActiveTab] = useState('all');
  const [showSort, setShowSort]   = useState(false);

  const filtered =
    activeTab === 'all'
      ? MOCK_PROJECTS
      : MOCK_PROJECTS.filter((p) => p.type === activeTab);

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      {/* Hero */}
      <section
        className="relative h-64 w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${project})` }}
      >
        <div className="relative z-10 px-5 pt-6">
          <p className="mt-10 text-[22px] font-extrabold leading-tight text-psu-deep-blue-500 drop-shadow-sm">
            {language === 'th' ? 'ติดตามโครงการ' : 'Track Project'}
          </p>
          <p className="mt-1 whitespace-pre-line text-[12px] text-psu-deep-blue-400">
            {language === 'th'
              ? 'อัพเดตสถานะทุกความคืบหน้า\nของโครงการคุณ'
              : 'Track your project progress'}
          </p>
        </div>
      </section>

      {/* Main */}
      <div className="rounded-t-3xl bg-white px-4 pb-32 pt-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[15px] font-bold text-gray-900">
            {language === 'th' ? 'โครงการของฉัน' : 'My Projects'}
          </p>
          <button
            onClick={() => setShowSort((p) => !p)}
            className="flex items-center gap-1 text-[11px] font-medium text-psu-deep-blue-500"
          >
            {language === 'th' ? 'เรียงล่าสุด' : 'Sort'}
            <FaChevronDown
              size={9}
              className={`transition-transform ${showSort ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition ${
                activeTab === tab.key
                  ? 'bg-psu-deep-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab.label[language]} ({tab.count})
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-[13px] text-gray-400">
              {language === 'th' ? 'ไม่มีโครงการในหมวดนี้' : 'No projects in this category'}
            </p>
          ) : (
            filtered.map((item) => (
              <ProjectCard key={item.id} item={item} language={language} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackProject;