import { useMediaQuery } from '@react-hook/media-query';
import React, { useEffect, useRef } from 'react';
import { animated, config, useTransition } from 'react-spring';

type TextItem = {
  title: JSX.Element;
  description: JSX.Element;
}

type TextProps = {
  state: number;
  items: TextItem[];
}

export const Text: React.FC<TextProps> = ({ state, items }) => {
  const isMd = useMediaQuery('screen and (min-width: 768px)');
  const prevStateRef = useRef(-1);

  const transitions = useTransition(state, {
    from: {
      opacity: 0,
      transform: isMd
        ? `translateY(${state > prevStateRef.current ? 50 : -50}%)`
        : `translateX(${state > prevStateRef.current ? 120 : -120}%)`,
    },
    enter: {
      opacity: 1,
      transform: isMd
        ? 'translateY(0%)'
        : 'translateX(0%)',
    },
    leave: {
      opacity: 0,
      transform: isMd
        ? `translateY(${state > prevStateRef.current ? -50 : 50}%)`
        : `translateX(${state > prevStateRef.current ? -120 : 120}%)`,
    },
    config: isMd ? config.molasses : config.slow,
  });

  useEffect(() => {
    prevStateRef.current = state;
  }, [state]);

  return <div className="relative h-full w-full overflow-hidden">
    {
      transitions((style, item) => (
        <animated.div className="absolute h-full flex flex-col px-8 md:px-0 md:justify-center" style={style}>
          <div className="text-4xl md:text-6xl text-white font-black">
            {items[item].title}
          </div>

          <div className="text-lg md:text-xl text-gray-400 font-light mt-2 md:mt-4">
            {items[item].description}
          </div>
        </animated.div>
      ))
    }
  </div>;
};
