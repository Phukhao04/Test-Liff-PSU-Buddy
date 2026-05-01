import Context from '@/contexts/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const HeadBar = () => {
  const { lineUser, switchLanguage, language } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-xl p-2 max-w-md w-full mb-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => switchLanguage()}
          className="bg-psu-andaman-blue-200 text-psu-deep-blue-500 rounded-full px-4 py-2 hover:bg-psu-andaman-blue-300 transition"
        >
          {language === 'th' ? 'EN' : 'TH'}
        </button>

        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 hover:cursor-pointer hover:bg-blue-50 rounded-full px-2 py-1 transition"
        >
          <p className="text-lg text-psu-deep-blue-500 max-[300px]:hidden">
            {lineUser?.displayName}
          </p>
          <img
            className="h-9 w-9 rounded-full shadow-md"
            src={lineUser?.pictureUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeadBar;