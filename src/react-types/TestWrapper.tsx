import { PropsWithChildren } from 'react';

export const TestWrapper = ({ children }: PropsWithChildren) => {
  return <div style={{ backgroundColor: 'yellowgreen' }}>{children}</div>;
};
