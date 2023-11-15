import React from 'react';
import ReactDOM from 'react-dom/client';
import ConverterApp from './components/ConverterApp/ConverterApp';
import GlobalStyles from './GlobalStyles'; // Import GlobalStyles

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles /> 
    <ConverterApp />
  </React.StrictMode>
);
