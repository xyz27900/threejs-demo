import { ChevronDown48Regular, ChevronUp48Regular } from '@ricons/fluent';
import React from 'react';
import { classname } from '@/utils/classname';

type PaginationProps = {
  next: () => void;
  prev: () => void;
  current: number;
  total: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const Pagination: React.FC<PaginationProps> = ({ next, prev, current, total, className, ...props }) => {
  return <div
    className={
      classname(
        'flex',
        'flex-col',
        'gap-4',
        '-rotate-90',
        'md:rotate-0',
        className,
      )
    }
    {...props}
  >
    <button
      className={
        classname(
          'w-12',
          'h-12',
          'transition',
          'duration-500',
          current === 0 && 'opacity-0',
          current === 0 && 'pointer-events-none',
        )
      }
      onClick={prev}
    >
      <ChevronUp48Regular className="text-gray-400 hover:text-white transition" />
    </button>

    <button
      className={
        classname(
          'w-12',
          'h-12',
          'transition',
          'duration-500',
          current === total && 'opacity-0',
          current === total && 'pointer-events-none',
        )
      }
      onClick={next}
    >
      <ChevronDown48Regular className="text-gray-400 hover:text-white transition" />
    </button>
  </div>;
};
