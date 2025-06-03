import '../app.css.ts';

import { FocusInOut } from './focus-in-out/FocusInOut.tsx';
// import React from 'react';
import ReactDOM from 'react-dom/client';

// import { CleanUpFunction } from './clean-up-function/CleanUpFunction';
// import { VirtualDom } from './virtual-dom/VirtualDom';
// import { BottomSheetTest } from './bottom-sheet/BottomSheetTest';
// import { SingletonTest } from './singleton/axios-example/Test';
// import { ReflowTrigger } from './reflow-trigger/ReflowTrigger';
// import { SameKeyProp } from './same-key-prop/SameKeyProp';

// import './index.css';

// import { ReactElement } from './same-key-prop/ReactElement';
// import { UseOverlayExample } from './overlay/useOverlay/UseOverlay';
// import { FlushSync } from './flushSync/FlushSync';
// import { SyntheticEvent } from './SyntheticEvent/index.tsx';
// import { Propagation } from './SyntheticEvent/propagation.tsx';
// import { UpdateState } from './UpdateState/UpdateState.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {/* <App /> */}
    {/* <SyntheticEvent /> */}
    {/* <Propagation /> */}
    {/* <UpdateState /> */}
    {/* <FlushSync /> */}
    {/* <UseOverlayExample /> */}
    {/* <CleanUpFunction /> */}
    {/* <VirtualDom /> */}
    {/* <BottomSheetTest /> */}
    {/* <SingletonTest /> */}
    {/* <ReflowTrigger /> */}
    {/* <SameKeyProp /> */}
    {/* <ReactElement /> */}
    {/* <VanillaExtractExample /> */}
    {/* <RenderButtonGroupWithVanillaExtract /> */}
    {/* <EmotionExample /> */}
    {/* <VanillaExtractExample /> */}
    {/* <ReactTypes /> */}
    <FocusInOut />
  </>
);

// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     mutation.addedNodes.forEach((node) => {
//       if ((node as HTMLElement).tagName === 'STYLE') {
//         console.log('🔍 새로운 style 태그가 추가됨:', node);
//         console.log('📍 내용 일부:', node.textContent?.slice(0, 200));
//       }
//     });
//   });
// });

// observer.observe(document.head, { childList: true });
