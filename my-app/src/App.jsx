import { BrowserRouter } from 'react-router-dom';
import Context from '@/contexts/Context';
import Layout from '@/components/templates/Layout';
import { useState } from 'react';
import './index.css';

const mockLiff = {
  isLoggedIn: () => true,
  login: () => alert('login'),
  logout: () => alert('logout'),
  closeWindow: () => alert('closeWindow'),
};

const mockLineUser = {
  userId: 'mock-user-id',
  displayName: 'PSU Buddy Dev',
  pictureUrl: 'https://placehold.co/80x80/003c71/white?text=PSU',
};

const mockTheUser = {
  psuType: 'student',
  psuId: '6610210312',
  name: { th: 'ภูวิศา รัญเวศ', en: 'Puvisa Runwet' },
  campusName: { th: 'วิทยาเขตหาดใหญ่', en: 'Hat Yai Campus' },
  eduLevel: { th: 'ปริญญาตรี', en: 'Bachelor' },
  facName: { th: 'วิทยาศาสตร์', en: 'Science' },
  deptName: { th: 'วิทยาการคำนวณ', en: 'Computational Science' },
  programName: { th: 'เทคโนโลยีสารสนเทศและการสื่อสาร', en: 'Information and Communication Technology' },
  isActivityLeader: true,
  //isActivityLeader: false,
  activityRole: { th: 'ประธานชุมนุมแบ๊วแห่งประเทศไทย', en: 'Activity President' },
};

function App() {
  const [language, setLanguage] = useState('th');

  const switchLanguage = () => setLanguage((prev) => (prev === 'th' ? 'en' : 'th'));

  return (
    <Context.Provider value={{
      language, setLanguage, switchLanguage,
      theUser: mockTheUser,
      lineUser: mockLineUser,
      liff: mockLiff,
      isAuthDone: true,
      isLiffError: false,
    }}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;