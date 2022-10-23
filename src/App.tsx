import { useMediaQuery } from '@react-hook/media-query';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import { BouncingText } from '@/components/BouncingText';
import { Composition } from '@/components/Composition';
import { Loader } from '@/components/Loader';
import { Pagination } from '@/components/Pagination';
import { SkyBox } from '@/components/SkyBox';

const SLIDES_NUMBER = 4;

export const App: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      setSlide((prev) => (prev + 1) % SLIDES_NUMBER);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      setSlide((prev) => (prev - 1 + SLIDES_NUMBER) % SLIDES_NUMBER);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className="h-full">
        <Canvas shadows camera={{ position: [0, 0, 40], fov: 12 }}>
          <Composition slide={slide} />
          <SkyBox distance={50} />
          <SkyBox distance={100} />
        </Canvas>
      </div>

      {
        isMd
          ? <div className="fixed text-center bottom-12 left-1/2 transform -translate-x-1/2">
            <BouncingText>
              Use arrow keys to change laptop state
            </BouncingText>
          </div>
          : null
      }

      <Pagination
        total={SLIDES_NUMBER}
        current={slide}
        goTo={setSlide}
      />
    </Suspense>
  );
};
