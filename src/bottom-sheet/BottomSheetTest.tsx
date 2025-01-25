/**
 * shadcn/ui의 Sheet는 정말 Sheet의 느낌으로 snap 기반 동작은 구현해야 함
 *
 * vaul도 shadcn과 동일하게 radix 기반이라 인터페이스는 비슷하며, 생각보다 문서에 동작 관련된 예제도 잘 되어 있어서 수월하게 만들었다.
 */
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Drawer as BottomSheet } from 'vaul';

export const BottomSheetTest = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <button>Click me - shadcn</button>
        </SheetTrigger>
        <SheetContent className='h-[300px]'>바텀~</SheetContent>
      </Sheet>
      <BottomSheet.Root>
        <BottomSheet.Trigger>
          <button>Click me - vaul</button>
        </BottomSheet.Trigger>
        <BottomSheet.Portal>
          <BottomSheet.Overlay className='fixed inset-0 bg-black/40' />
          <BottomSheet.Content className='bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[300px] fixed bottom-0 left-0 right-0 outline-none'>
            <div className='p-4 bg-white rounded-t-[10px] flex-1'>
              <div
                aria-hidden
                className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8'
              />
              바텀 ~
            </div>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet.Root>
    </div>
  );
};
