import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { SyntheticEvent } from './SyntheticEvent/index.tsx';
// import { Propagation } from './SyntheticEvent/propagation.tsx';
// import { UpdateState } from './UpdateState/UpdateState.tsx';
import { Transition } from './useTransition/Transition.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <SyntheticEvent /> */}
    {/* <Propagation /> */}
    {/* <UpdateState /> */}
    <Transition />
  </React.StrictMode>
);
