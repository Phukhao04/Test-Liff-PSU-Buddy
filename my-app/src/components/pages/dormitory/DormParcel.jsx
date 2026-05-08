import { useContext, useState } from 'react';
import { FaChevronRight, FaSearch } from 'react-icons/fa';

import Context from '@/contexts/Context';

const TABS = [
  { key: 'all',      label: { th: 'ทั้งหมด (All)', en: 'All' } },
  { key: 'pending',  label: { th: 'รอรับ',         en: 'Pending' } },
  { key: 'received', label: { th: 'รับแล้ว',       en: 'Received' } },
];

const STATUS_CONFIG = {
  pending:  { label: { th: 'รอรับพัสดุ', en: 'Pending'  }, bg: 'bg-blue-100',  text: 'text-blue-600'  },
  received: { label: { th: 'รับแล้ว',   en: 'Received' }, bg: 'bg-green-100', text: 'text-green-600' },
};

const MOCK_PARCELS = [
  {
    term: { th: 'เทอม 2 / ปีการศึกษา 2568', en: 'Semester 2 / 2025' },
    items: [
      { id: 'ED476463587TH', room: 'ห้อง 10', date: { th: '10 ก.พ. 2568', en: '10 Feb 2025' }, status: 'pending'  },
      { id: 'ED476463587TH', room: 'ห้อง 10', date: { th: '10 ก.พ. 2568', en: '10 Feb 2025' }, status: 'received' },
    ],
  },
  {
    term: { th: 'เทอม 1 / ปีการศึกษา 2568', en: 'Semester 1 / 2025' },
    items: [
      { id: 'ED999999999TH', room: 'ห้อง 10', date: { th: '5 ม.ค. 2568', en: '5 Jan 2025' }, status: 'pending'  },
      { id: 'ED999999999TH', room: 'ห้อง 10', date: { th: '5 ม.ค. 2568', en: '5 Jan 2025' }, status: 'received' },
      { id: 'ED999999999TH', room: 'ห้อง 10', date: { th: '5 ม.ค. 2568', en: '5 Jan 2025' }, status: 'received' },
      { id: 'ED999999999TH', room: 'ห้อง 10', date: { th: '5 ม.ค. 2568', en: '5 Jan 2025' }, status: 'received' },
      { id: 'ED999999999TH', room: 'ห้อง 10', date: { th: '5 ม.ค. 2568', en: '5 Jan 2025' }, status: 'received' },
    ],
  },
];

const ParcelItem = ({ item, language }) => {
  const s = STATUS_CONFIG[item.status];

  return (
    <button className="flex w-full items-center justify-between px-4 py-3 transition active:scale-95">
      <div className="flex-1 text-left">
        <p className="text-base font-bold text-gray-900">{item.id}</p>
        <p className="text-sm text-gray-500">
          {item.room} • {item.date[language]}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${s.bg} ${s.text}`}>
          {s.label[language]}
        </span>
        <FaChevronRight size={12} className="text-gray-300" />
      </div>
    </button>
  );
};

const ParcelGroup = ({ group, language }) => (
  <div className="overflow-hidden rounded-2xl bg-gray-50">
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <p className="text-base font-semibold text-gray-700">{group.term[language]}</p>
      <p className="text-sm text-gray-500">
        {group.items.length} {language === 'th' ? 'รายการ' : 'items'}
      </p>
    </div>

    <div className="divide-y divide-gray-100">
      {group.items.map((item, i) => (
        <ParcelItem key={`${item.id}-${i}`} item={item} language={language} />
      ))}
    </div>
  </div>
);

const DormParcel = () => {
  const { language, theUser } = useContext(Context);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch]       = useState('');

  const filteredGroups = MOCK_PARCELS
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const matchTab    = activeTab === 'all' || item.status === activeTab;
        const matchSearch = item.id.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
      }),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Main Content */}
      <div className="mt-9 relative bg-white px-4 pb-32 pt-5">
        {/* Search */}
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3">
          <FaSearch size={16} className="shrink-0 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'th' ? 'ค้นหาเลขพัสดุ' : 'Search tracking number'}
            className="flex-1 bg-transparent text-base text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Tab Filter */}
        <div className="mb-4 flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? 'bg-psu-deep-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        {/* Parcel List */}
        <div className="space-y-4">
          {filteredGroups.map((group, i) => (
            <ParcelGroup key={`${group.term.en}-${i}`} group={group} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DormParcel;