import * as Toast from '@radix-ui/react-toast';
import {
  createContext,
  ForwardedRef,
  forwardRef,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
// import { overlay } from 'overlay-kit';

export const UseOverlayExample = () => {
  return (
    <Toast.Provider>
      <OverlayProvider>
        <OverlayButton>OPEN!</OverlayButton>
        <Toast.Viewport />
      </OverlayProvider>
    </Toast.Provider>
  );
};

const OverlayButton = ({ children }: PropsWithChildren) => {
  const overlay = useOverlay();

  return (
    <button
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <Toast.Root
            duration={1000}
            className='ToastRoot'
            open={isOpen}
            onOpenChange={close}>
            토스트! 🍞
          </Toast.Root>
        ));
      }}>
      {children}
    </button>
  );
};

interface OverlayContextProps {
  add: (id: string, element: ReactNode) => void;
  remove: (id: string) => void;
}

const OverlayContext = createContext<OverlayContextProps | null>(null);

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayMap, setOverlayMap] = useState(new Map());

  const add = useCallback((id: string, element: ReactNode) => {
    setOverlayMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, element);
      return newMap;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setOverlayMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const context = useMemo(() => ({ add, remove }), []);
  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlayMap.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

type CreateOverlayElement = (props: { isOpen: boolean; close: () => void }) => ReactNode;
const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error('useOverlay is only available within OverlayProvider');
  }

  const { add, remove } = context;
  const id = useId();

  const overlayRef = useRef<OverlayControllerRef | null>(null);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        add(
          id,
          <OverlayController
            /**
             * @NOTE ⭐️
             * open 메서드가 실행될 때마다 매번 새로운 컴포넌트를 렌더링
             */
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
          />
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        remove(id);
      },
    }),
    [id]
  );
};

interface OverlayControllerProps {
  overlayElement: CreateOverlayElement;
}

interface OverlayControllerRef {
  close: () => void;
}

const OverlayController = forwardRef(function OverlayController(
  props: OverlayControllerProps,
  ref: ForwardedRef<OverlayControllerRef>
) {
  const { overlayElement: OverlayElement } = props;
  const [isOpen, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(true);
  }, []);

  useImperativeHandle(ref, () => ({ close: handleClose }), [handleClose]);

  return (
    <OverlayElement
      isOpen={isOpen}
      close={handleClose}
    />
  );
});

/**
 * 🗒️ @NOTE
 *
 * 역할을 정리해보자
 * - Toast
 *    - createPortal 보유
 *    - open, defaultOpen, onOpenChange로 상태 제어
 *    - open값이 달라짐에 따라 useEffect가 걸려있다.
 *    - 일반적으로 열리고 닫히는 것은 open prop으로 제어되며 (useEffect)
 *    - onOpenChange로 전달된 메서드는 의도적으로 닫을 때 사용된다(타이머 설정, keyboard로 닫기)
 * - ToastProvider
 *    - Viewport 상태 (dom)의 출발
 *    - Toast.Viewport에서 상태 업데이트
 *    - Toast는 이 viewport 상태 값을 사용해서 createPortal
 * - OverlayProvider
 *    - overlay map 상태의 출발
 *    - Provider를 통해 overlay map에 추가하고 제거하는 메서드 내려주게 됨
 *    - useOverlay는 해당 메서드를 context로 사용해서 컴포넌트가 렌더링되었을 때 닫히는 동작이 필요할 때 해당 메서드를 사용하게 된다.
 * - useOverlay
 *    - Provider를 통해 받은 overlay map에 추가하고 제거하는 메서드를 사용하게 된다.
 *
 *
 * 결론적으로는 useOverlay를 통해 만들어진
 *  <OverlayElement isOpen={처음 렌더링될 때 true} close={상태를 false로 할 수 있는 핸들러} />
 * 를 렌더링하게 된다.
 *
 * 그럼 어떻게 close가 되었다가 또 다시 open이 되었느냐
 * 만약 타이머를 걸었다고 해보자. 그렇다면, 시간이 끝날 때 close로 넘긴 핸들러를 사용하여 우선 state를 false로 만들기 때문에 toast가 닫히는 것을 생각할 수 있다.
 *
 * 그 이후에 Button을 클릭하여 onClick이 호출되면 key={Date.now()}를 통해 다른 키 즉, 새로운 Toast 컴포넌트가 렌더링될 것이다.
 * 이때 다시 useEffect(() => setOpen(tre), [])가 호출될 것이므로 새로운 toast는 새로 열리게 되는 것이다.
 */
