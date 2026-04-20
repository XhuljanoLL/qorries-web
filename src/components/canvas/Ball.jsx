import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, Preload, useTexture } from '@react-three/drei';
import Loader from '../Loader';

const DRAG_THRESHOLD_PX = 14;
const ROTATE_SENSITIVITY = 0.006;

const Ball = ({ imgUrl, href }) => {
  const [decal] = useTexture([imgUrl]);
  const rotateGroupRef = useRef(null);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const group = rotateGroupRef.current;
    if (!group) return;

    const state = {
      lastX: e.clientX,
      lastY: e.clientY,
      total: 0,
      href,
    };

    const onMove = (ev) => {
      const dx = ev.clientX - state.lastX;
      const dy = ev.clientY - state.lastY;
      state.lastX = ev.clientX;
      state.lastY = ev.clientY;
      state.total += Math.hypot(dx, dy);
      group.rotation.y += dx * ROTATE_SENSITIVITY;
      group.rotation.x += dy * ROTATE_SENSITIVITY;
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      document.body.style.cursor = '';

      if (state.total < DRAG_THRESHOLD_PX && state.href) {
        window.open(state.href, '_blank', 'noopener,noreferrer');
      }
    };

    document.body.style.cursor = 'grabbing';
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <group ref={rotateGroupRef}>
        <mesh
          castShadow
          receiveShadow
          scale={2.75}
          onPointerDown={handlePointerDown}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#3d3d3d"
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            flatShading
            map={decal}
          />
        </mesh>
      </group>
    </Float>
  );
};

const BallCanvas = ({ icon, href }) => {
  return (
    <Canvas frameloop="always" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<Loader />}>
        <Ball imgUrl={icon} href={href} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
