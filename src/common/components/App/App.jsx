import React, { Suspense } from 'react';
import { AppIndex } from '../AppIndex';

const Site = React.lazy(() => import('../Test'));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<AppIndex />}>
        <Site />
      </Suspense>
    </div>
  );
};
