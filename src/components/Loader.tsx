import React from 'react';
import { BouncingText } from '@/components/BouncingText';

export const Loader: React.FC = () => {
  return <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2">
    <BouncingText>
      Loading...
    </BouncingText>
  </div>;
};
