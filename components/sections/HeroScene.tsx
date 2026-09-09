"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function plusShape(arm = 0.22, thickness = 0.09) {
  const s = new THREE.Shape();
  const a = thickness / 2;
  const b = arm;
  s.moveTo(-a, -a);
  s.lineTo(-a, -b);
  s.lineTo(a, -b);
  s.lineTo(a, -a);
  s.lineTo(b, -a);
  s.lineTo(b, a);
  s.lineTo(a, a);
  s.lineTo(a, b);
  s.lineTo(-a, b);
  s.lineTo(-a, a);
  s.lineTo(-b, a);
  s.lineTo(-b, -a);
  s.closePath();
  return s;
}

function PlusField() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = 40;

  const geometry = useMemo(() => {
    const shape = plusShape();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: false });
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const points = useMemo(() => {
    const pts: { pos: THREE.Vector3; scale: number; speed: number }[] = [];
    const radius = 2.2;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push({
        pos: new THREE.Vector3(x, y, z).multiplyScalar(radius),
        scale: 0.45 + Math.random() * 0.6,
        speed: 0.3 + Math.random() * 0.7,
      });
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!mesh.current || !group.current) return;
    const t = state.clock.getElapsedTime();

    points.forEach((p, i) => {
      dummy.position.copy(p.pos);
      dummy.rotation.set(t * 0.15 * p.speed, t * 0.2 * p.speed, 0);
      const s = p.scale * (0.85 + Math.sin(t * p.speed + i) * 0.15);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;

    group.current.rotation.y = t * 0.06;
    group.current.rotation.x = Math.sin(t * 0.08) * 0.08;

    const { pointer } = state;
    group.current.rotation.y += pointer.x * 0.25;
    group.current.rotation.x += -pointer.y * 0.15;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
        <meshStandardMaterial
          color="#c6ff5e"
          emissive="#7fce34"
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.1}
        />
      </instancedMesh>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#c6ff5e" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x += (state.pointer.x * 0.6 - camera.position.x) * 0.02;
    camera.position.y += (state.pointer.y * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // A WebGL render loop keeps burning frames while the hero is scrolled past
  // or the tab is in the background, which is exactly when the rest of the
  // page needs the main thread. Render only while the canvas is on screen.
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let onScreen = true;
    const sync = () => setActive(onScreen && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "10% 0px" }
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#c6ff5e" />
        <pointLight position={[-6, -3, -4]} intensity={20} color="#4dd8ff" />
        <PlusField />
        <Rig />
      </Canvas>
    </div>
  );
}
