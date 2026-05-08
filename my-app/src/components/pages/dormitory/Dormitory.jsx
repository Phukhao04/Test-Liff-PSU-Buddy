import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '@/contexts/Context';
import Dorm from '@/assets/img/dorm.png';
import {
  FaHome, FaDoorOpen, FaBox, FaPhone, FaEnvelope,
  FaClipboardList, FaChevronRight, FaBoxOpen, FaClock,
  FaCheckCircle, FaFacebook,
} from 'react-icons/fa';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_DORM = {
  name:     { th: 'หอในกำกับ 11', en: 'Dormitory 11' },
  room:     { th: '111209',        en: '111209' },
  semester: { th: '1/2569',        en: '1/2026' },
};

const MOCK_PARCELS = [
  {
    id: 'ED1234567890TH',
    carrier: 'ไปรษณีย์',
    arrivedAt: { th: 'ถึงหอพักเมื่อ 20 พ.ค. 2567 10:30 น.', en: 'Dorm on 20 May 2024 10:30' },
    status: 'received',
  },
];

const PARCEL_STATS = [
  { icon: <FaBox size={18} />,         label: { th: 'ถึงแล้ว', en: 'Arrived' },  count: 2, color: 'text-blue-500',   bg: 'bg-blue-50' },
  { icon: <FaClock size={18} />,       label: { th: 'รอรับ',   en: 'Pending' },  count: 1, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: <FaCheckCircle size={18} />, label: { th: 'รับแล้ว', en: 'Received' }, count: 3, color: 'text-green-500',  bg: 'bg-green-50' },
];

const CONTACTS = [
  { icon: <FaPhone size={16} />,    label: { th: 'โทรศัพท์', en: 'Phone' },    value: '074-282660' },
  { icon: <FaEnvelope size={16} />, label: { th: 'อีเมล',    en: 'Email' },    value: 'psudormh@hotmail.com' },
  { icon: <FaFacebook size={16} />, label: { th: 'เพจ',      en: 'Fan Page' }, value: { th: 'หอพักนักศึกษา ม.อ. หาดใหญ่', en: 'PSU Dormitory' }, hasArrow: true },
];

const DORM_FIELDS = [
  { icon: <FaHome size={15} />,        label: { th: 'ชื่อหอพัก',    en: 'Dormitory' }, value: MOCK_DORM.name },
  { icon: <FaDoorOpen size={15} />,    label: { th: 'หมายเลขห้อง', en: 'Room No.' },  value: MOCK_DORM.room },
  { icon: <FaClipboardList size={15} />,label: { th: 'ภาคการศึกษา', en: 'Semester' }, value: MOCK_DORM.semester },
];

// ─── Page ────────────────────────────────────────────────────────────────────

const Dormitory = () => {
  const { language } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gray-50">

      {/* Hero */}
      <section
        className="relative h-52 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Dorm})` }}
      >
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6">
          <div className="max-w-[55%]">
            <h1 className="text-[22px] font-extrabold leading-tight text-psu-deep-blue-500">
              {language === 'th' ? 'บริการหอพัก' : 'Dormitory Service'}
            </h1>
            <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-gray-600">
              {language === 'th'
                ? 'สะดวก ปลอดภัย\nอุ่นใจตลอดการเข้าพัก'
                : 'Convenient & Safe\nSupport throughout your stay'}
            </p>
            <button className="mt-4 rounded-full bg-psu-river-blue-500 px-5 py-2 text-[12px] font-semibold text-psu-deep-blue-500 shadow-md transition active:scale-95">
              {language === 'th' ? 'จองหอพัก' : 'Book Dormitory'}
            </button>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="relative -mt-3 rounded-t-3xl bg-white px-4 pb-32 pt-5">

        {/* Dorm Info */}
        <p className="mb-3 text-[15px] font-bold text-gray-900">
          {language === 'th' ? 'ข้อมูลการเข้าพักปัจจุบัน' : 'Current Stay Info'}
        </p>
        <div className="mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {DORM_FIELDS.map((field, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 ${i !== DORM_FIELDS.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-psu-sritrang-100 text-psu-deep-blue-500">
                {field.icon}
              </div>
              <p className="w-24 text-[12px] text-gray-500">{field.label[language]}</p>
              <p className="text-[14px] font-semibold text-psu-deep-blue-500">
                {field.value[language] || field.value.th}
              </p>
            </div>
          ))}
        </div>

        {/* Parcel Header */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[15px] font-bold text-gray-900">
            {language === 'th' ? 'สถานะพัสดุ' : 'Parcel Status'}
          </p>
          <button
            onClick={() => navigate('/dormitory/parcel')}
            className="text-[12px] font-semibold text-psu-deep-blue-500"
          >
            {language === 'th' ? 'ดูทั้งหมด' : 'See all'}
            <FaChevronRight size={10} className="ml-1 inline" />
          </button>
        </div>

        {/* Parcel Stats */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {PARCEL_STATS.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center rounded-2xl py-3 gap-1 ${stat.bg}`}>
              <span className={stat.color}>{stat.icon}</span>
              <p className="text-[16px] font-bold text-gray-800">{stat.count}</p>
              <p className="text-[11px] text-gray-600">{stat.label[language]}</p>
            </div>
          ))}
        </div>

        {/* Parcel Cards */}
        {MOCK_PARCELS.map((parcel) => (
          <button
            key={parcel.id}
            className="mb-4 flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-400">
                <FaBoxOpen size={18} />
              </div>
              <div className="text-left">
                <p className="text-[13px] font-bold text-gray-900">{parcel.id}</p>
                <p className="text-[11px] text-gray-500">{parcel.carrier}</p>
                <p className="text-[11px] text-gray-500">{parcel.arrivedAt[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                {language === 'th' ? 'ถึงแล้ว' : 'Arrived'}
              </span>
              <FaChevronRight size={11} className="text-gray-300" />
            </div>
          </button>
        ))}

        {/* Contact */}
        <p className="mb-3 text-[15px] font-bold text-gray-900">
          {language === 'th' ? 'ช่องทางติดต่อสำนักงานหอพัก' : 'Dormitory Office Contact'}
        </p>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {CONTACTS.map((contact, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 ${i !== CONTACTS.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-psu-sritrang-100 text-psu-deep-blue-500">
                {contact.icon}
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-500">{contact.label[language]}</p>
                <p className="text-[13px] font-semibold text-gray-700">
                  {typeof contact.value === 'object'
                    ? contact.value[language] || contact.value.th
                    : contact.value}
                </p>
              </div>
              {contact.hasArrow && <FaChevronRight size={11} className="text-gray-300" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dormitory;