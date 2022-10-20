/* eslint-disable react/no-unknown-property */
import { animated, config, useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import THREE from 'three';

const MODEL_URL = 'mbp.glb';

export type NodesWithGeometry = {
  [name: string]: THREE.Object3D & {
    geometry: THREE.BufferGeometry;
  }
}

type LaptopProps = {
  state: number;
  scale: number;
}

/**
 * 0 - Lid closed, front view
 * 1 - Lid opened, front view
 * 2 - Lid opened, top view
 * 3 - Lid closed, top inverted view
 */

export const Laptop: React.FC<LaptopProps> = ({ state, scale }) => {
  const { nodes: nodesGLTF, materials } = useGLTF(MODEL_URL);
  const nodes = nodesGLTF as NodesWithGeometry;

  const [mounted, setMounted] = useState(false);

  const { lidRotation } = useSpring({
    lidRotation: [1, 2].includes(state) ? -1.92 : 0,
    config: config.molasses,
  });

  const { caseRotationX } = useSpring({
    caseRotationX: state === 0
      ? Math.PI / 2 + 0.2
      : state === 1
        ? Math.PI / 2 + 0.4
        : Math.PI,
    config: config.molasses,
  });

  const { caseRotationY } = useSpring({
    caseRotationY: state === 3 ? Math.PI : 0,
    config: config.molasses,
  });

  const { casePositionY } = useSpring({
    casePositionY: state === 1 ? -0.5 : 0,
    config: config.molasses,
  });

  const { caseScale } = useSpring({
    caseScale: mounted ? scale : 0,
    config: config.molasses,
  });

  useEffect(() => {
    setMounted(true);
  } , []);

  return (
    <animated.group scale={caseScale} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <animated.group
          position-z={casePositionY}
          rotation-x={caseRotationX}
          rotation-y={caseRotationY}
          rotation-z={0}
        >
          <group position={[-1.45, 0.09, -0.57]}>
            <mesh geometry={nodes.Object_15.geometry} material={materials['Material.011']} />
          </group>
          <animated.group
            position={[0, 0.1, -1.01]}
            rotation-x={lidRotation}
            rotation-y={0}
            rotation-z={0}
          >
            <group position={[-0.03, 0.62, 1.02]} rotation={[-Math.PI, 0, -Math.PI]} scale={[32.94, 32.94, 33.49]}>
              <mesh geometry={nodes.Object_23.geometry} material={materials['Material.017']} />
            </group>
            <mesh geometry={nodes.Object_17.geometry} material={materials['Material.003']} />
            <mesh geometry={nodes.Object_18.geometry} material={materials['Material.007']} />
            <mesh geometry={nodes.Object_19.geometry} material={materials['Material.006']} />
            <mesh geometry={nodes.Object_20.geometry} material={materials['Material.005']} />
            <group position={[0,-0.01,0]}>
              <mesh geometry={nodes.Object_21.geometry} material={materials['Material.008']} />
            </group>
          </animated.group>
          <mesh geometry={nodes.Object_25.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.Object_26.geometry} material={materials['Material.014']} />
          <group position={[-1.49, 0.09, -0.76]} rotation={[Math.PI, 0, Math.PI / 2]} scale={[-0.01, 0.01, 0.01]}>
            <mesh geometry={nodes.Object_28.geometry} material={materials['Material.010']} />
          </group>
          <mesh geometry={nodes.Object_4.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.Object_5.geometry} material={materials['Material.013']} />
          <mesh geometry={nodes.Object_6.geometry} material={materials['Material.016']} />
          <mesh geometry={nodes.Object_7.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.Object_8.geometry} material={materials['Material.002']} />
          <mesh geometry={nodes.Object_9.geometry} material={materials['Material.002']} />
          <mesh geometry={nodes.Object_10.geometry} material={materials['Material.002']} />
          <mesh geometry={nodes.Object_11.geometry} material={materials['Material.002']} />
          <mesh geometry={nodes.Object_12.geometry} material={materials['Material.009']} />
          <mesh geometry={nodes.Object_13.geometry} material={materials['Material.009']} />
        </animated.group>
      </group>
    </animated.group>
  );
};

useGLTF.preload(MODEL_URL);
