'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

type Hero3DProps = {
  className?: string;
};

export default function Hero3D({ className }: Hero3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      42,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0.04, 0.18, 5.8);
    camera.lookAt(0, 0, 0);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(-5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(5, 4, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
    rimLight.position.set(-4, -3, -5);
    scene.add(rimLight);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.05;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const fontLoader = new FontLoader();
    const rgbeLoader = new RGBELoader().setDataType(THREE.HalfFloatType);

    const loadFont = () =>
      new Promise<Font>((resolve, reject) => {
        fontLoader.load('/fonts/Lobster_Regular.json', resolve, undefined, reject);
      });

    const loadHDR = () =>
      new Promise<THREE.DataTexture>((resolve, reject) => {
        rgbeLoader.load('/hdr/studio_small_03_4k.hdr', resolve, undefined, reject);
      });

    const group = new THREE.Group();
    group.position.y = -0.12;
    group.rotation.x = 0.04;
    group.rotation.y = 0.08;
    scene.add(group);

    let textMesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial> | null = null;
    let hdrEnvMap: THREE.Texture | null = null;

    Promise.all([loadFont(), loadHDR()])
      .then(([font, hdrTexture]) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

        const textGeometry = new TextGeometry('me', {
          font,
          size: 2,
          depth: 0.62,
          curveSegments: 120,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 14,
        });

        textGeometry.center();
        textGeometry.computeBoundingBox();
        textGeometry.computeVertexNormals();

        hdrEnvMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
        scene.environment = hdrEnvMap;

        const chromeMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xf8fbff,
          metalness: 1.0,
          roughness: 0.12,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
          envMap: hdrEnvMap,
          envMapIntensity: 1.3,
          reflectivity: 1.0,
          transmission: 0,
        });

        textMesh = new THREE.Mesh(textGeometry, chromeMaterial);
        textMesh.castShadow = true;
        textMesh.receiveShadow = true;
        group.add(textMesh);
      })
      .catch((error) => {
        console.error('Hero3D asset load failed', error);
      });

    const resizeScene = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      group.rotation.y += 0.003;
      group.position.y = Math.sin(elapsed * 0.8) * 0.15;
      renderer.render(scene, camera);
    };

    resizeScene();
    animate();
    window.addEventListener('resize', resizeScene);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeScene);
      renderer.dispose();
      pmremGenerator.dispose();
      if (hdrEnvMap) hdrEnvMap.dispose();
      if (textMesh) {
        textMesh.geometry.dispose();
        textMesh.material.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
