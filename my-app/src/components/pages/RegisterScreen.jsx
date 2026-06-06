import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Context from '@/contexts/Context';
import Axios from '@/config/Axios';
import Logo from '@/assets/img/Logo.png';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { idToken, character, language } = useContext(Context);

  const [psuId, setPsuId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const primary = character?.color ?? '#5aaef7';

  const handleRegister = async () => {
    if (!psuId.trim()) {
      setError(language === 'th' ? 'กรุณากรอกรหัสนักศึกษา' : 'Please enter your PSU ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await Axios.post(
        '/liff/register',
        { idToken, psuId: psuId.trim() },
        { validateStatus: false }
      );

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      } else if (res.status === 409) {
        setError(language === 'th' ? 'บัญชีนี้ผูกไว้แล้ว' : 'Account already registered');
      } else if (res.data?.message === 'psu_not_found') {
        setError(language === 'th' ? 'ไม่พบรหัสนักศึกษาในระบบ PSU' : 'PSU ID not found');
      } else {
        setError(language === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError(language === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden px-6 py-12 bg-white">

      {/* BG dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1.2px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={Logo} alt="PSU Buddy" className="w-[160px] object-contain" />
      </motion.div>

      {/* Form */}
      <motion.div
        className="relative z-10 w-full max-w-xs flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-center mb-2">
          <p className="text-xl font-bold text-gray-800">
            {language === 'th' ? 'ผูกบัญชี PSU' : 'Link PSU Account'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'th'
              ? 'กรอกรหัสนักศึกษาเพื่อเชื่อมบัญชี LINE กับ PSU Passport'
              : 'Enter your student ID to link LINE with PSU Passport'}
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {language === 'th' ? 'รหัสนักศึกษา / รหัสบุคลากร' : 'Student ID / Personnel ID'}
          </label>
          <input
            type="text"
            value={psuId}
            onChange={(e) => { setPsuId(e.target.value); setError(''); }}
            placeholder="เช่น 6610210312"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-base outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition"
            maxLength={20}
          />
        </div>

        {/* Error */}
        {error && (
          <motion.p
            className="text-sm text-red-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Success */}
        {success && (
          <motion.p
            className="text-sm text-green-500 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {language === 'th' ? '✅ ผูกบัญชีสำเร็จ! กำลังเข้าสู่ระบบ...' : '✅ Registered! Redirecting...'}
          </motion.p>
        )}

        {/* Button */}
        <motion.button
          onClick={handleRegister}
          disabled={loading || success}
          className="w-full rounded-2xl py-4 text-base font-bold text-white relative overflow-hidden disabled:opacity-60"
          style={{ background: primary }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          />
          <span className="relative z-10">
            {loading
              ? (language === 'th' ? 'กำลังผูกบัญชี...' : 'Linking...')
              : (language === 'th' ? 'ผูกบัญชี' : 'Link Account')}
          </span>
        </motion.button>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        className="relative z-10 text-xs text-gray-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {language === 'th'
          ? 'ข้อมูลของคุณจะถูกเก็บเป็นความลับและปลอดภัย'
          : 'Your data is kept private and secure'}
      </motion.p>

    </div>
  );
};

export default RegisterScreen;