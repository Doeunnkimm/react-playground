import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SyntheticEvent } from './SyntheticEvent/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <SyntheticEvent />
  </React.StrictMode>
);
