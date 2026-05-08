import { useContext } from 'react';
import Context from '@/contexts/Context';
import {
  FaIdCard, FaUser, FaMapMarkerAlt,
  FaGraduationCap, FaUniversity, FaUsers, FaBook,
} from 'react-icons/fa';

const buildStudentFields = (theUser, language) => [
  { icon: <FaIdCard />,        label: { th: 'รหัสนักศึกษา', en: 'Student ID' }, value: theUser?.psuId },
  { icon: <FaUser />,          label: { th: 'ชื่อ-สกุล',    en: 'Full Name' },  value: theUser?.name?.[language] },
  { icon: <FaMapMarkerAlt />,  label: { th: 'วิทยาเขต',     en: 'Campus' },     value: theUser?.campusName?.[language] || theUser?.campusName?.th },
  { icon: <FaGraduationCap />, label: { th: 'ระดับการศึกษา',en: 'Level' },      value: theUser?.eduLevel?.[language]  || theUser?.eduLevel?.th },
  { icon: <FaUniversity />,    label: { th: 'คณะ',          en: 'Faculty' },    value: theUser?.facName?.[language]   || theUser?.facName?.th },
  { icon: <FaUsers />,         label: { th: 'สาขาวิชา',     en: 'Major' },      value: theUser?.deptName?.[language]  || theUser?.deptName?.th },
  { icon: <FaBook />,          label: { th: 'หลักสูตร',     en: 'Program' },    value: theUser?.programName?.[language] || theUser?.programName?.th },
];

const Profile = () => {
  const { language, theUser } = useContext(Context);
  const fields = buildStudentFields(theUser, language);

  return (
    <div className="relative min-h-screen w-full bg-white">

      {/* Hero image */}
      <section className="relative h-56 w-full overflow-hidden bg-cover bg-top bg-no-repeat"/>

      {/* Content */}
      <div className="relative z-10 -mt-44 px-5">
        <h1 className="mb-3 text-[22px] font-bold text-psu-deep-blue-500">
          Profile
        </h1>

        {/* ID Card */}
        <div className="mb-4 overflow-hidden rounded-3xl bg-psu-deep-blue-500 shadow-xl">
          <div className="px-4 pt-3">
            <p className="text-[13px] font-semibold text-white/70">มหาวิทยาลัยสงขลานครินทร์</p>
            <p className="text-[11px] text-white/50">Prince of Songkla University</p>
          </div>

          <div className="flex items-start justify-between px-4 pb-4 pt-2">
            {/* Left — info */}
            <div className="flex-1 pr-3">
              <p className="text-[16px] font-bold text-white">
                {theUser?.name?.th || ''}
              </p>
              <p className="text-[13px] text-white/80">
                {theUser?.name?.en || ''}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-white">
                {theUser?.psuId || ''}
              </p>
              <p className="mt-1 text-[11px] text-white/70">
                {language === 'th' ? 'คณะ' : 'Faculty'}:{' '}
                {theUser?.facName?.[language] || theUser?.facName?.th || ''}
              </p>
              <p className="text-[11px] text-white/70">
                {language === 'th' ? 'สาขา' : 'Program'}:{' '}
                {theUser?.programName?.[language] || theUser?.programName?.th || ''}
              </p>
            </div>

            {/* Right — photo placeholder */}
            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-white/30 bg-white/20" />
          </div>
        </div>

        {/* Info List */}
        <p className="mb-3 text-[15px] font-semibold text-gray-700">
          {language === 'th' ? 'ข้อมูลส่วนตัว' : 'Personal Information'}
        </p>

        <div className="space-y-1">
          {fields.map((field, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl px-2 py-2.5 transition hover:bg-gray-50"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-psu-sritrang-100 text-[15px] text-psu-deep-blue-500">
                {field.icon}
              </div>
              <div>
                <p className="text-[11px] text-gray-400">{field.label[language]}</p>
                <p className="text-[14px] font-semibold text-psu-deep-blue-500">
                  {field.value || '-'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;