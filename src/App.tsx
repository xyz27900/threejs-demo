import { Canvas } from '@react-three/fiber';
import React, { useState } from 'react';
import { Composition } from '@/components/Composition';
import { Pagination } from '@/components/Pagination';
import { Text } from '@/components/Text';
import { classname } from '@/utils/classname';

const textItems = [
  {
    title: <React.Fragment>I&apos;m stronger</React.Fragment>,
    description: <React.Fragment>The most powerful MacBook Pro ever is here.</React.Fragment>,
  },
  {
    title: <React.Fragment>I&apos;m smarter</React.Fragment>,
    description: <React.Fragment>With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life.</React.Fragment>,
  },
  {
    title: <React.Fragment>I&apos;m better</React.Fragment>,
    description: <React.Fragment>A stunning Liquid Retina XDR display, the best camera and audio ever in a Mac laptop, and all the ports you need.</React.Fragment>,
  },
  {
    title: <React.Fragment>I <span className="text-red-600">am</span> better!</React.Fragment>,
    description: <React.Fragment>The first notebook of its kind, this MacBook Pro is a beast.</React.Fragment>,
  },
];

export const App: React.FC = () => {
  const [slide, setSlide] = useState(0);

  const nextSlide = (): void => {
    if (slide < textItems.length) {
      setSlide(slide + 1);
    }
  };

  const prevSlide = (): void => {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1">
          <Canvas shadows camera={{ position: [0, 0, 40], fov: 12 }}>
            <Composition slide={slide} />
          </Canvas>
        </div>

        <div className="flex flex-col justify-center md:flex-1 h-1/3 md:h-auto">
          <div className="md:w-8/12 h-full">
            <Text items={textItems} state={slide} />
          </div>
        </div>

        <div className="flex items-center justify-center h-12 md:h-auto my-8 md:my-0">
          <Pagination
            className={
              classname(
                'md:fixed',
                'md:right-4',
                'md:top-1/2',
                'transform',
                'md:-translate-y-1/2',
              )
            }
            next={nextSlide}
            prev={prevSlide}
            current={slide}
            total={3}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
