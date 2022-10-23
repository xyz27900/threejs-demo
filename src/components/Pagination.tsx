import React from 'react';
import { classname } from '@/utils/classname';

type PaginationProps = {
  total: number;
  current: number;
  goTo: (index: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ goTo, current, total }) => {
  return <div className={
    classname(
      'fixed',
      'left-1/2',
      'bottom-8',
      'md:left-auto',
      'md:right-8',
      'md:bottom-auto',
      'md:top-1/2',
      'transform',
      '-translate-x-1/2',
      'md:translate-x-0',
      'md:-translate-y-1/2',
      'flex',
      'md:flex-col',
      'gap-4',
      'md:gap-6',
    )
  }
  >
    {
      Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={
            classname(
              'h-3',
              'w-3',
              'md:h-4',
              'md:w-4',
              'rounded-full',
              'bg-gray-400',
              'hover:bg-white',
              'transition',
              'duration-500',
              'transform',
              index === current && 'bg-white',
              index === current && 'scale-110',
            )
          }
          onClick={(): void => goTo(index)}
        />
      ))
    }
  </div>;
};
