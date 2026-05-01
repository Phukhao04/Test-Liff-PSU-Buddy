import { useContext } from 'react';
import Context from '@/contexts/Context';
import sri from '@/assets/img/sri.jpg';
import head from '@/assets/img/head.png';
import {
  FaIdCard,
  FaUser,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUniversity,
  FaUsers,
  FaBook,
} from 'react-icons/fa';

const Profile = () => {
  const { language, theUser } = useContext(Context);

  const studentFields = [
    { icon: <FaIdCard />,        label: { th: 'รหัสนักศึกษา', en: 'Student ID' },   value: theUser?.psuId },
    { icon: <FaUser />,          label: { th: 'ชื่อ-สกุล', en: 'Full Name' },        value: theUser?.name?.[language] },
    { icon: <FaMapMarkerAlt />,  label: { th: 'วิทยาเขต', en: 'Campus' },            value: theUser?.campusName?.[language] || theUser?.campusName?.['th'] },
    { icon: <FaGraduationCap />, label: { th: 'ระดับการศึกษา', en: 'Level' },        value: theUser?.eduLevel?.[language] || theUser?.eduLevel?.['th'] },
    { icon: <FaUniversity />,    label: { th: 'คณะ', en: 'Faculty' },                value: theUser?.facName?.[language] || theUser?.facName?.['th'] },
    { icon: <FaUsers />,         label: { th: 'สาขาวิชา', en: 'Major' },             value: theUser?.deptName?.[language] || theUser?.deptName?.['th'] },
    { icon: <FaBook />,          label: { th: 'หลักสูตร', en: 'Program' },           value: theUser?.programName?.[language] || theUser?.programName?.['th'] },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${sri})` }} /> */}
      <div className="absolute inset-0 bg-psu-sritrang-100" />

      {/* Hero image */}
      <section
        className="relative h-56 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: `url(${head})` }}
      />

      {/* Profile title */}
      <div className="relative z-10 px-5 -mt-44">
        <h1 className="text-[22px] font-bold text-psu-deep-blue-500 mb-3">Profile</h1>

        {/* Hero Card */}
        <div className="overflow-hidden rounded-3xl bg-psu-deep-blue-500 shadow-xl mb-4">
          <div className="px-4 pt-3">
            <p className="text-[14px] font-semibold text-white/70">มหาวิทยาลัยสงขลานครินทร์</p>
            <p className="text-[12px] text-white/50">Prince of Songkla University</p>
          </div>

          <div className="flex items-start justify-between px-4 pb-4 pt-2">
            {/* Left */}
            <div className="flex-1 pr-3">
              <p className="text-[18px] font-bold text-white">
                {theUser?.name?.['th'] || ''}
              </p>
              <p className="text-[16px] text-white/80">
                {theUser?.name?.['en'] || ''}
              </p>
              <p className="mt-1 text-[18px] font-semibold text-white">
                {theUser?.psuId || ''}
              </p>
              <p className="mt-1 text-[14px] text-white/70">
                {language === 'th' ? 'คณะ' : 'Faculty'}: {theUser?.facName?.[language] || theUser?.facName?.['th'] || ''}
              </p>
              <p className="text-[14px] text-white/70">
                {language === 'th' ? 'สาขา' : 'Program'}: {theUser?.programName?.[language] || theUser?.programName?.['th'] || ''}
              </p>
            </div>

            {/* Right: photo placeholder */}
            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-white/30 bg-white/20" />
          </div>
        </div>

        {/* Info List */}
          <p className="mb-3 text-[18px] font-semibold text-gray-700">
            {language === 'th' ? 'ข้อมูลส่วนตัว' : 'Personal Information'}
          </p>
          <div className="space-y-1">
            {studentFields.map((field, index) => (
              <div key={index} className="flex items-start gap-3 rounded-2xl px-2 py-2.5 hover:bg-white/60 transition">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-psu-sritrang-100 text-psu-deep-blue-500 text-[15px]">
                  {field.icon}
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">{field.label[language]}</p>
                  <p className="text-[16px] font-semibold text-psu-deep-blue-500">
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