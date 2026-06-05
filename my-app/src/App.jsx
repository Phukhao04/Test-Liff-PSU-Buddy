import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './contexts/ContextProvider';
import Layout from './components/templates/Layout';
const isProduction = import.meta.env.MODE === 'production';
const { VITE_basename } = import.meta.env;
import './App.css';

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
