const TABS = [
  { key: 'all',      label: { th: 'ทั้งหมด',  en: 'All'        } },
  { key: 'core',     label: { th: 'สมรรถนะ',  en: 'Competency' } },
  { key: 'elective', label: { th: 'ความสนใจ', en: 'Electives'  } },
];

const ActivityTabs = ({ activeTab, onTabChange, language, primary }) => (
  <div className="mb-3 flex gap-2 overflow-x-auto">
    {TABS.map(tab => (
      <button
        key={tab.key}
        onClick={() => onTabChange(tab.key)}
        className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition"
        style={{
          backgroundColor: activeTab === tab.key ? primary : '#f3f4f6',
          color:           activeTab === tab.key ? '#fff'  : '#6b7280',
        }}
      >
        {tab.label[language]}
      </button>
    ))}
  </div>
);

export default ActivityTabs;