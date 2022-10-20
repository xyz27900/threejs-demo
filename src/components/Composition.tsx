/* eslint-disable react/no-unknown-property */
import { softShadows } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { Laptop } from '@/components/Laptop';

softShadows();

type CompositionProps = {
  slide: number;
}

export const Composition: React.FC<CompositionProps> = ({ slide }) => {
  const { width } = useThree((state) => state.viewport);

  const group = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const stripLight = useRef<THREE.SpotLight>(null);
  const fillLight = useRef<THREE.SpotLight>(null);

  return (
    <React.Fragment>
      <spotLight
        position={[0, 0, 0]}
        intensity={0.5}
      />

      <directionalLight
        ref={keyLight}
        castShadow={true}
        intensity={6}
      />

      <group
        ref={group}
        position={[0, 0, 0]}
      >
        <spotLight
          ref={stripLight}
          position={[width * 2.5, 10, width]}
          angle={0.19}
          penumbra={1}
          intensity={0.25}
        />

        <spotLight
          ref={fillLight}
          position={[0, 7, width]}
          angle={5}
          penumbra={1}
          intensity={2}
          distance={width * 3}
        />

        <Laptop
          state={slide}
          scale={width / 6}
        />
      </group>
    </React.Fragment>
  );
};
