import { PropsWithChildren, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AsyncBoundaryProps {
  errorFallback?: ReactNode;
  loadingFallback: ReactNode;
  children: ReactNode;
}

export const AsyncBoundary = (props: AsyncBoundaryProps) => {
  const { errorFallback, loadingFallback, children } = props;

  return (
    <ErrorBoundary fallback={<RenderWithPrimitive>{errorFallback}</RenderWithPrimitive>}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const RenderWithPrimitive = ({ children }: PropsWithChildren) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return <>{children}</>;
  }
  return children;
};
