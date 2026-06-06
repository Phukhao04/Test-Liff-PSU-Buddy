import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './contexts/ContextProvider';
import Layout from './components/templates/Layout';
const isProduction = import.meta.env.MODE === 'production';
const { VITE_basename } = import.meta.env;
import './App.css';

function App() {
  return (
    <BrowserRouter basename={isProduction ? VITE_basename : '/'}>
      <ContextProvider>
        <Layout />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
