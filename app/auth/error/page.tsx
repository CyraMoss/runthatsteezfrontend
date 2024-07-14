// app/auth/error/page.tsx

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
    </div>
  );
};

const WrappedErrorPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ErrorPage />
  </Suspense>
);

export default WrappedErrorPage;
