import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const EARTH_TEXTURE_URL = "https://unpkg.com/three-globe/example/img/earth-dark.jpg";
const GLOBE_RADIUS = 118;
const CAMERA_Z_START = 340;
const CAMERA_Z_END = 165;
const CAMERA_Y_END = 32;
const INITIAL_ROTATION_Y = 0;
const MARKER_SPRITE_SIZE = 10;
const ATMOSPHERE_COLOR = 0x5da2ff;

type ScrollGlobeProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

type StateMarker = {
  name: string;
  lat: number;
  lon: number;
};

const LEGALIZATION_WAVE: StateMarker[] = [
  { name: "New Jersey", lat: 40.0583, lon: -74.4057 },
  { name: "Pennsylvania", lat: 41.2033, lon: -77.1945 },
  { name: "West Virginia", lat: 38.5976, lon: -80.4549 },
  { name: "Indiana", lat: 40.2672, lon: -86.1349 },
  { name: "Illinois", lat: 40.6331, lon: -89.3985 },
  { name: "Iowa", lat: 41.878, lon: -93.0977 },
  { name: "Colorado", lat: 39.5501, lon: -105.7821 },
  { name: "Arizona", lat: 34.0489, lon: -111.0937 },
  { name: "Nevada", lat: 38.8026, lon: -116.4194 },
  { name: "Wyoming", lat: 43.076, lon: -107.2903 },
  { name: "Washington", lat: 47.7511, lon: -120.7401 },
  { name: "Oregon", lat: 43.8041, lon: -120.5542 },
];

function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function buildGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 244, 170, 1)");
  gradient.addColorStop(0.45, "rgba(255, 209, 89, 0.95)");
  gradient.addColorStop(1, "rgba(255, 189, 40, 0)");

  context.clearRect(0, 0, size, size);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ScrollGlobe({ sectionRef }: ScrollGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(isMobileViewport);
  const [mountAttempt, setMountAttempt] = useState(0);

  useEffect(() => {
    const handleResizeCheck = () => {
      setIsMobile(isMobileViewport());
    };

    window.addEventListener("resize", handleResizeCheck);
    return () => window.removeEventListener("resize", handleResizeCheck);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current ?? canvas?.closest("section");
    if (!canvas || !section) {
      const retryId = window.requestAnimationFrame(() => setMountAttempt((value) => value + 1));
      return () => window.cancelAnimationFrame(retryId);
    }

    let rafId = 0;
    let hasStartedScrollTakeover = false;
    let takeoverStartRotationY = 0;
    let isSectionActive = false;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
    camera.position.set(0, 0, CAMERA_Z_START);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.55);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.25);
    directionalLight.position.set(160, 120, 190);
    const fillLight = new THREE.DirectionalLight(0x7aa8ff, 1.25);
    fillLight.position.set(-120, -20, -140);
    scene.add(ambientLight, directionalLight, fillLight);

    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x1d3e6d),
      emissiveIntensity: 0.78,
      shininess: 32,
      specular: new THREE.Color(0x656565),
    });
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    let earthTexture: THREE.Texture | null = null;
    earthTexture = textureLoader.load(
      EARTH_TEXTURE_URL,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        globeMaterial.map = loadedTexture;
        globeMaterial.color.set(0xffffff);
        globeMaterial.needsUpdate = true;
      },
      undefined,
      () => {
        globeMaterial.map = null;
        globeMaterial.color.set(0x5e90d8);
        globeMaterial.emissive.set(0x1e4f91);
        globeMaterial.needsUpdate = true;
      },
    );
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.03, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: ATMOSPHERE_COLOR,
      transparent: true,
      opacity: 0.68,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    const glowTexture = buildGlowTexture();
    const markerMaterials: THREE.SpriteMaterial[] = [];
    const stateMarkers = new THREE.Group();

    LEGALIZATION_WAVE.forEach((state) => {
      if (!glowTexture) return;
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffd75a,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      markerMaterials.push(material);
      const marker = new THREE.Sprite(material);
      marker.position.copy(latLonToVector3(state.lat, state.lon, GLOBE_RADIUS + 1.75));
      marker.scale.setScalar(MARKER_SPRITE_SIZE);
      stateMarkers.add(marker);
    });

    scene.add(stateMarkers);

    const scrollTarget = {
      cameraZ: CAMERA_Z_START,
      cameraY: 0,
      rotationY: INITIAL_ROTATION_Y,
      glowProgress: 0,
    };
    const smoothState = {
      cameraZ: CAMERA_Z_START,
      cameraY: 0,
      rotationY: INITIAL_ROTATION_Y,
      glowProgress: 0,
    };

    const usCenterRotationY = THREE.MathUtils.degToRad(98);
    const autoRotateSpeed = 0.0018;

    const resizeRenderer = () => {
      const width = section.clientWidth;
      const height = section.clientHeight;
      if (width <= 0 || height <= 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resizeRenderer();
    const resizeObserver = new ResizeObserver(() => {
      resizeRenderer();
    });
    resizeObserver.observe(section);

    const updateMarkers = (progress: number) => {
      const wavePosition = progress * (markerMaterials.length + 1);
      markerMaterials.forEach((material, index) => {
        const distance = wavePosition - index;
        const intensity = THREE.MathUtils.clamp(distance, 0, 1);
        material.opacity = intensity * 0.95;
      });
    };

    const resetToInitialState = () => {
      hasStartedScrollTakeover = false;
      takeoverStartRotationY = INITIAL_ROTATION_Y;
      scrollTarget.cameraZ = CAMERA_Z_START;
      scrollTarget.cameraY = 0;
      scrollTarget.rotationY = INITIAL_ROTATION_Y;
      scrollTarget.glowProgress = 0;
      smoothState.cameraZ = CAMERA_Z_START;
      smoothState.cameraY = 0;
      smoothState.rotationY = INITIAL_ROTATION_Y;
      smoothState.glowProgress = 0;
      globeMesh.rotation.y = INITIAL_ROTATION_Y;
      atmosphereMesh.rotation.y = INITIAL_ROTATION_Y;
      updateMarkers(0);
    };

    const renderLoop = () => {
      rafId = window.requestAnimationFrame(renderLoop);

      if (isSectionActive && !hasStartedScrollTakeover) {
        globeMesh.rotation.y += autoRotateSpeed;
        scrollTarget.rotationY = globeMesh.rotation.y;
        smoothState.rotationY = globeMesh.rotation.y;
      }

      smoothState.cameraZ = THREE.MathUtils.lerp(smoothState.cameraZ, scrollTarget.cameraZ, 0.1);
      smoothState.cameraY = THREE.MathUtils.lerp(smoothState.cameraY, scrollTarget.cameraY, 0.1);
      smoothState.rotationY = THREE.MathUtils.lerp(smoothState.rotationY, scrollTarget.rotationY, 0.08);
      smoothState.glowProgress = THREE.MathUtils.lerp(smoothState.glowProgress, scrollTarget.glowProgress, 0.12);

      globeMesh.rotation.y = smoothState.rotationY;
      atmosphereMesh.rotation.y = smoothState.rotationY;
      camera.position.set(0, smoothState.cameraY, smoothState.cameraZ);
      camera.lookAt(0, 0, 0);
      updateMarkers(smoothState.glowProgress);
      renderer.render(scene, camera);
    };

    renderLoop();

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=250%",
      scrub: true,
      onEnter: () => {
        isSectionActive = true;
        hasStartedScrollTakeover = false;
      },
      onEnterBack: () => {
        isSectionActive = true;
      },
      onUpdate: (self) => {
        if (!hasStartedScrollTakeover && self.progress > 0.015) {
          hasStartedScrollTakeover = true;
          takeoverStartRotationY = globeMesh.rotation.y;
          scrollTarget.rotationY = takeoverStartRotationY;
          smoothState.rotationY = takeoverStartRotationY;
        }

        const clampedProgress = THREE.MathUtils.clamp(self.progress, 0, 1);
        scrollTarget.cameraZ = THREE.MathUtils.lerp(CAMERA_Z_START, CAMERA_Z_END, clampedProgress);
        scrollTarget.cameraY = THREE.MathUtils.lerp(0, CAMERA_Y_END, clampedProgress);
        scrollTarget.rotationY = THREE.MathUtils.lerp(takeoverStartRotationY, usCenterRotationY, clampedProgress);
        scrollTarget.glowProgress = clampedProgress;
      },
      onLeave: () => {
        isSectionActive = false;
      },
      onLeaveBack: () => {
        isSectionActive = false;
        resetToInitialState();
      },
    });

    const handleResize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      resizeRenderer();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      scrollTrigger.kill();

      stateMarkers.clear();
      markerMaterials.forEach((material) => material.dispose());
      glowTexture?.dispose();

      globeGeometry.dispose();
      atmosphereGeometry.dispose();
      globeMaterial.dispose();
      atmosphereMaterial.dispose();
      earthTexture?.dispose();

      renderer.dispose();
    };
  }, [isMobile, sectionRef, mountAttempt]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] block h-full w-full opacity-100" aria-hidden="true" />;
}
