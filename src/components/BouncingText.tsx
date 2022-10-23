import React, { PropsWithChildren } from 'react';

export const BouncingText: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="text-2xl text-gray-200 font-thin animate-bounce-slow tracking-widest">
    {children}
  </div>;
};
