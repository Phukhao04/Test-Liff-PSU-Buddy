import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './contexts/ContextProvider';
import Layout from './components/templates/Layout';
import './App.css';
const isProduction = import.meta.env.MODE === 'production';
const { VITE_basename } = import.meta.env;

function App() {
  return (
    <BrowserRouter basename="/">
      <ContextProvider>
        <Layout />
      </ContextProvider>
    </BrowserRouter>
  );
}
export default App;
