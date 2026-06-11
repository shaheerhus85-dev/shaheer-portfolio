"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const DEFAULT_MODEL_PATH = "/models/im-signature.glb";
const MODEL_TARGET_WIDTH = 8.8;
const CAMERA_POSITION = [0, 0.1, 8.3] as [number, number, number];
const CAMERA_FOV = 35;
const SIGNATURE_POSITION = [0, -0.02, 0] as [number, number, number];

const SIGNATURE_SCALE = {
  desktop: [0.6, 0.62, 0.62] as [number, number, number],
  tablet: [0.5, 0.52, 0.52] as [number, number, number],
  mobile: [0.37, 0.39, 0.39] as [number, number, number],
};

const CHROME_MATERIAL = {
  color: "#bdb7ae",
  metalness: 1,
  roughness: 0.14,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 3.8,
};

const LIGHTING = {
  ambient: 0.34,
  key: 3.8,
  front: 2.2,
  rim: 4.6,
  top: 1.2,
};

// Calm premium motion on the top-level GLB group.
const MOTION = {
  yRotationSpeed: 0.2,
  xTiltAmplitude: 0.024,
  xTiltSpeed: 0.22,
  zTiltAmplitude: 0.012,
  zTiltSpeed: 0.18,
  floatAmplitude: 0.035,
  floatSpeed: 0.42,
};

type SignatureModelProps = {
  viewportWidth: number;
  modelPath: string;
  onReady: () => void;
};

function getResponsiveScale(width: number) {
  if (width < 640) return SIGNATURE_SCALE.mobile;
  if (width < 1024) return SIGNATURE_SCALE.tablet;
  return SIGNATURE_SCALE.desktop;
}

function SignatureObject({ viewportWidth, modelPath, onReady }: SignatureModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = useRef(SIGNATURE_POSITION[1]);
  const gltf = useGLTF(modelPath);

  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(CHROME_MATERIAL.color),
        metalness: CHROME_MATERIAL.metalness,
        roughness: CHROME_MATERIAL.roughness,
        clearcoat: CHROME_MATERIAL.clearcoat,
        clearcoatRoughness: CHROME_MATERIAL.clearcoatRoughness,
        envMapIntensity: CHROME_MATERIAL.envMapIntensity,
      }),
    []
  );

  const modelScene = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      mesh.material = chromeMaterial;
      chromeMaterial.needsUpdate = true;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    });

    const bounds = new THREE.Box3().setFromObject(scene);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const maxWidth = Math.max(size.x, 0.001);
    const normalizeScale = MODEL_TARGET_WIDTH / maxWidth;

    scene.position.sub(center.multiplyScalar(normalizeScale));
    scene.scale.setScalar(normalizeScale);

    return scene;
  }, [chromeMaterial, gltf.scene]);

  useEffect(() => {
    onReady();
  }, [modelScene, onReady]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = clock.getElapsedTime();
    group.rotation.y += delta * MOTION.yRotationSpeed;
    group.rotation.x = Math.sin(t * MOTION.xTiltSpeed) * MOTION.xTiltAmplitude;
    group.rotation.z = Math.sin(t * MOTION.zTiltSpeed) * MOTION.zTiltAmplitude;
    group.position.y = baseY.current + Math.sin(t * MOTION.floatSpeed) * MOTION.floatAmplitude;
  });

  return (
    <group
      ref={groupRef}
      position={SIGNATURE_POSITION}
      scale={getResponsiveScale(viewportWidth)}
    >
      <primitive object={modelScene} />
    </group>
  );
}

type SignatureSceneProps = {
  modelPath: string;
  onReady: () => void;
};

function ChromeEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    const previousEnvironment = scene.environment;
    const previousBackground = scene.background;

    scene.environment = environment;
    scene.background = null;

    return () => {
      scene.environment = previousEnvironment;
      scene.background = previousBackground;
      environment.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return null;
}

function SignatureScene({ modelPath, onReady }: SignatureSceneProps) {
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  return (
    <>
      <ChromeEnvironment />
      <ambientLight intensity={LIGHTING.ambient} />
      <directionalLight color="#ffffff" position={[-4, 6, 5]} intensity={LIGHTING.key} />
      <pointLight color="#ffffff" position={[0, 4, 7]} intensity={LIGHTING.front} />
      <directionalLight color="#ffffff" position={[3, 2, -5]} intensity={LIGHTING.rim} />
      <directionalLight color="#ffffff" position={[0, 7, 2]} intensity={LIGHTING.top} />
      <Suspense fallback={null}>
        <SignatureObject viewportWidth={viewportWidth} modelPath={modelPath} onReady={onReady} />
      </Suspense>
    </>
  );
}

type HeroSignature3DProps = {
  modelPath?: string;
};

export default function HeroSignature3D({ modelPath = DEFAULT_MODEL_PATH }: HeroSignature3DProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    setModelReady(false);
  }, [modelPath]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center overflow-hidden"
      data-signature-mode="glb"
    >
      <Canvas
        className={`pointer-events-none h-full w-full transition-opacity duration-500 ${
          modelReady ? "opacity-100" : "opacity-0"
        }`}
        frameloop="always"
        dpr={[1, 1.5]}
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.34;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        shadows={false}
      >
        <SignatureScene modelPath={modelPath} onReady={() => setModelReady(true)} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(DEFAULT_MODEL_PATH);
