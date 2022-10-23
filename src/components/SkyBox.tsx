import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BufferAttribute, BufferGeometry, PerspectiveCamera, Points, PointsMaterial, Vector2 } from 'three';

const DISTANCE = 50;
const POINTS = 5e2;

type SkyBoxProps = {
  distance?: number;
  points?: number;
}

export const SkyBox: React.FC<SkyBoxProps> = ({ distance = DISTANCE, points = POINTS }) => {
  const { camera, scene } = useThree();
  const object = useRef<Points | null>(null);

  useFrame(() => {
    if (object.current) {
      object.current.rotation.z += 1e-4;
    }
  });

  const visibleSizeAt = (z: number): Vector2 => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const cameraOffset = perspectiveCamera.position.z;
    const depth = z + cameraOffset * (z < cameraOffset ? -1 : 1);
    const vFOV = perspectiveCamera.fov * Math.PI / 180;
    const height = 2 * Math.tan( vFOV / 2 ) * Math.abs(depth);
    const width = height * perspectiveCamera.aspect;
    return new Vector2(width, height);
  };

  const getRandomPositions = (count = 100): Float32Array => {
    const array = new Float32Array(count * 3);
    return array.map((_, i) => {
      return (i + 1) % 3 === 0 ? 0 : Math.random() - .5;
    });
  };

  const createGeometry = (): BufferGeometry => {
    return new BufferGeometry();
  };

  const createMaterial = (): PointsMaterial => {
    return new PointsMaterial({
      size: 0.15,
      color: 0xa0a0a0,
      transparent: true,
    });
  };

  const createObject = (geometry: BufferGeometry, material: PointsMaterial): Points => {
    geometry.attributes.position = new BufferAttribute(getRandomPositions(points), 3);
    return new Points(geometry, material);
  };

  useEffect(() => {
    const { width, height } = visibleSizeAt(distance);
    const size = Math.sqrt(width ** 2 + height ** 2);

    const geometry = createGeometry();
    const material = createMaterial();

    object.current = createObject(geometry, material);
    object.current.position.set(0, 0, -distance);
    object.current.scale.set(size, size, 1);

    scene.add(object.current);
  }, []);

  return null;
};
