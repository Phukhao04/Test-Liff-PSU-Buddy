import { useState, useContext } from 'react';
import { FaPhone, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import Context from '@/contexts/Context';

const emergencyContacts = [
  {
    id: 'emergency',
    label: { th: 'เบอร์ฉุกเฉิน', en: 'Emergency' },
    color: '#FF6B6B',
    bgColor: '#FFF0F0',
    isEmergency: true,
    numbers: [
      { number: '074-282191', desc: { th: 'แจ้งเหตุด่วนเหตุร้าย งานรักษาความปลอดภัย', en: 'Security & Emergency Report' } },
      { number: '074-282888', desc: { th: 'ศูนย์บริการฉุกเฉินและบรรเทาสาธารณภัย', en: 'Emergency & Disaster Relief Center' } },
    ],
  },
  {
    id: 'student-dev',
    label: { th: 'งานพัฒนานักศึกษา', en: 'Student Development' },
    color: '#4B8CD2',
    bgColor: '#EEF4FF',
    isEmergency: false,
    numbers: [
      { number: '074-282208', desc: { th: 'หัวหน้างานพัฒนานักศึกษา', en: 'Head of Student Development' } },
      { number: '074-282209', desc: { th: 'งานพัฒนานักศึกษา', en: 'Student Development Office' } },
      { number: '074-282210', desc: { th: 'อาคารกิจกรรมนักศึกษา', en: 'Student Activity Building' } },
      { number: '074-282954', desc: { th: 'สภานักศึกษา', en: 'Student Council' } },
      { number: '074-282955', desc: { th: 'องค์การบริหาร องค์การนักศึกษา', en: 'Student Organization' } },
    ],
  },
  {
    id: 'pr',
    label: { th: 'งานหอพักนักศึกษา', en: 'Dormitory' },
    color: '#4B8CD2',
    bgColor: '#EEF4FF',
    isEmergency: false,
    numbers: [
      { number: '074-28-2212', desc: { th: 'หัวหน้างานหอพักนักศึกษา', en: 'Head of Dormitory' } },
      { number: '074-28-2216', desc: { th: 'ศูนย์อาหารโรงช้าง', en: 'Rice Mill Canteen' } },
      { number: '074-28-2660', desc: { th: 'สำนักงานหอพักนักศึกษา', en: 'Dormitory Office' } },
      { number: '074-28-2661', desc: { th: 'หอพักนักศึกษาอาคาร 1', en: 'Dormitory Building 1' } },
      { number: '074-28-2662', desc: { th: 'หอพักนักศึกษาอาคาร 2', en: 'Dormitory Building 2' } },
      { number: '074-28-2664', desc: { th: 'หอพักนักศึกษาอาคาร 3-4', en: 'Dormitory Building 3-4' } },
      { number: '074-28-2665', desc: { th: 'หอพักนักศึกษาอาคาร 5', en: 'Dormitory Building 5' } },
      { number: '074-28-2666', desc: { th: 'หอพักนักศึกษาอาคาร 6', en: 'Dormitory Building 6' } },
      { number: '074-28-2667', desc: { th: 'หอพักนักศึกษาอาคาร 7', en: 'Dormitory Building 7' } },
      { number: '074-28-2612', desc: { th: 'หอพักนักศึกษาอาคาร 12', en: 'Dormitory Building 12' } },
      { number: '074-28-2614', desc: { th: 'หอพักนักศึกษาอาคาร 14', en: 'Dormitory Building 14' } },
      { number: '074-28-2615', desc: { th: 'หอพักนักศึกษาอาคาร 15', en: 'Dormitory Building 15' } },
      { number: '074-500-020', desc: { th: 'หอพักในกำกับ 8-9, 10-11', en: 'Supervised Dormitory 8-9, 10-11' } },
    ],
  },
  {
    id: 'support',
    label: { th: 'งานวินัย สุขภาวะ และพัฒนาอาชีพ', en: 'Discipline, Health & Career' },
    color: '#4B8CD2',
    bgColor: '#EEF4FF',
    isEmergency: false,
    numbers: [
      { number: '074-28-2601', desc: { th: 'หัวหน้างานวินัย สุขภาวะและพัฒนาอาชีพนักศึกษา', en: 'Head of Discipline, Health & Career' } },
      { number: '074-28-2602', desc: { th: 'งานวินัย สุขภาวะและพัฒนาอาชีพนักศึกษา', en: 'Discipline, Health & Career Office' } },
      { number: '074-28-2604', desc: { th: 'บ้านวัยใส', en: 'Youth House' } },
      { number: '074-28-2222', desc: { th: 'ศูนย์บริการและสนับสนุนนักศึกษาพิการ (DSS)', en: 'Disability Support Services (DSS)' } },
    ],
  },
  {
    id: 'alumni',
    label: { th: 'งานศิษย์เก่าสัมพันธ์', en: 'Alumni Relations' },
    color: '#4B8CD2',
    bgColor: '#EEF4FF',
    isEmergency: false,
    numbers: [
      { number: '074-28-2205', desc: { th: 'TOEIC', en: 'TOEIC' } },
      { number: '074-28-2206', desc: { th: 'สมาคมศิษย์เก่า ม.อ.', en: 'PSU Alumni Association' } },
      { number: '074-28-2207', desc: { th: 'งานศิษย์เก่าสัมพันธ์', en: 'Alumni Relations Office' } },
    ],
  },
  {
    id: 'scholarship',
    label: { th: 'งานสวัสดิการและทุนการศึกษา', en: 'Welfare & Scholarships' },
    color: '#4B8CD2',
    bgColor: '#EEF4FF',
    isEmergency: false,
    numbers: [
      { number: '074-28-2211', desc: { th: 'ทุนต้นกล้า / ทุนทำงานแลกเปลี่ยน', en: 'Seed Fund / Work Exchange Program' } },
      { number: '074-28-2213', desc: { th: 'กยศ.', en: 'Student Loan Fund (SLF)' } },
      { number: '074-28-2214', desc: { th: 'ประกันอุบัติเหตุ / สุขภาพ', en: 'Accident & Health Insurance' } },
      { number: '074-28-2215', desc: { th: 'ทุนการศึกษา', en: 'Scholarships' } },
    ],
  },
];

const ContactGroup = ({ group, language, searchText }) => {
  const [open, setOpen] = useState(group.isEmergency);

  const filtered = group.numbers.filter(item =>
    item.number.includes(searchText) ||
    item.desc?.th?.includes(searchText) ||
    item.desc?.en?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (searchText && filtered.length === 0) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm mb-3"
      style={{ backgroundColor: group.bgColor }}
    >
      {/* header */}
      <button
        onClick={() => !group.isEmergency && setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 active:opacity-80 transition"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: group.color }}
          >
            {group.isEmergency ? <MdWarning size={16} /> : <span>📞</span>}
          </div>
          <p className="font-bold text-[15px]" style={{ color: group.color }}>
            {group.label[language]}
          </p>
        </div>
        {!group.isEmergency && (
          open
            ? <FaChevronUp size={13} color={group.color} />
            : <FaChevronDown size={13} color={group.color} />
        )}
      </button>

      {/* numbers */}
      {(open || searchText) && (
        <div className="px-4 pb-3 space-y-3">
          {filtered.map((item, index) => (
            item.number ? (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-[15px] font-semibold text-gray-800">{item.number}</p>
                  <p className="text-[12px] text-gray-500">{item.desc[language]}</p>
                </div>

                {/* ปุ่มโทร — เฉพาะหมวดฉุกเฉินเท่านั้น */}
                {group.isEmergency && (
                  <a
                    href={`tel:${item.number.replace(/-/g, '')}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition shadow-sm"
                    style={{ backgroundColor: group.color }}
                  >
                    <FaPhone size={15} className="text-white" />
                  </a>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

const Emergency = () => {
  const { language } = useContext(Context);
  const [searchText, setSearchText] = useState('');

  return (
    <div
      className="min-h-screen pb-24 px-4"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      <div className="pt-6 pb-3 text-center">
        <h1 className="text-[28px] font-bold text-[#1c1c1c]">
          {language === 'th' ? 'เบอร์โทรฉุกเฉิน' : 'Emergency Contacts'}
        </h1>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder={language === 'th' ? 'ค้นหา...' : 'Search...'}
          className="w-full rounded-2xl bg-white px-4 py-2.5 pr-10 text-[14px] shadow-sm outline-none focus:ring-2 focus:ring-[#4B8CD2]/30"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4B8CD2] flex items-center justify-center">
          <FaSearch size={13} className="text-white" />
        </div>
      </div>

      {emergencyContacts.map(group => (
        <ContactGroup
          key={group.id}
          group={group}
          language={language}
          searchText={searchText}
        />
      ))}
    </div>
  );
};

export default Emergency;