import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VEHICLE_HOTSPOTS } from '../data/automotiveData';
import { DiagnosticHotspot } from '../types';
import { RotateCw, Eye, Sparkles, Crosshair, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Vehicle3DViewerProps {
  onSelectService: (serviceId: string) => void;
}

export const Vehicle3DViewer: React.FC<Vehicle3DViewerProps> = ({ onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<DiagnosticHotspot | null>(VEHICLE_HOTSPOTS[0]);
  const [viewMode, setViewMode] = useState<'studio' | 'xray' | 'workshop'>('studio');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationTargetRef = useRef({ x: 0.25, y: -0.6 });
  const cameraDistanceRef = useRef(4.8);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 520;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.12);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.5, 1.8, 3.8);
    camera.lookAt(0, 0.2, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 4. Lighting Group
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    lightsGroup.add(ambientLight);

    // Key studio overhead light
    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.2);
    overheadLight.position.set(0, 6, 2);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 1024;
    overheadLight.shadow.mapSize.height = 1024;
    overheadLight.shadow.bias = -0.0005;
    lightsGroup.add(overheadLight);

    // Side rim blue light
    const rimBlue = new THREE.DirectionalLight(0x0284c7, 1.8);
    rimBlue.position.set(-5, 2, -4);
    lightsGroup.add(rimBlue);

    // Side rim red performance light
    const rimRed = new THREE.DirectionalLight(0xe11d24, 2.0);
    rimRed.position.set(5, 2, -4);
    lightsGroup.add(rimRed);

    // Front fill light
    const frontFill = new THREE.PointLight(0xffffff, 1.2, 10);
    frontFill.position.set(0, 1.2, 4.5);
    lightsGroup.add(frontFill);

    // Underglow light
    const underglowLight = new THREE.PointLight(0xe11d24, 2.5, 4);
    underglowLight.position.set(0, -0.2, 0);
    lightsGroup.add(underglowLight);

    // 5. Studio Floor with Grid & Circular Stage
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090a0f,
      roughness: 0.25,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.45;
    floor.receiveShadow = true;
    scene.add(floor);

    // Decorative circular rim track on floor
    const ringGeo = new THREE.RingGeometry(2.6, 2.65, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.44;
    scene.add(ring);

    // Outer subtle glowing red ring
    const redRingGeo = new THREE.RingGeometry(2.9, 2.92, 64);
    const redRingMat = new THREE.MeshBasicMaterial({
      color: 0xe11d24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const redRing = new THREE.Mesh(redRingGeo, redRingMat);
    redRing.rotation.x = -Math.PI / 2;
    redRing.position.y = -0.44;
    scene.add(redRing);

    // 6. Procedural High-Fidelity Muscle Sports Coupe
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Materials Dictionary
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: 0x14161d, // Deep obsidian metallic paint
      metalness: 0.92,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    materialsRef.current['paint'] = carPaintMat;

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.6,
      metalness: 0.4,
    });
    materialsRef.current['carbon'] = carbonMat;

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.65,
      transparent: true,
      opacity: 0.85,
    });
    materialsRef.current['glass'] = glassMat;

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.98,
      roughness: 0.15,
    });
    materialsRef.current['chrome'] = chromeMat;

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.9,
      metalness: 0.1,
    });
    materialsRef.current['tire'] = tireMat;

    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xe11d24, // Performance Red Brake Calipers
      roughness: 0.3,
      metalness: 0.8,
    });
    materialsRef.current['caliper'] = caliperMat;

    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });
    materialsRef.current['headlight'] = headlightMat;

    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 2.5,
      roughness: 0.2,
    });
    materialsRef.current['taillight'] = taillightMat;

    // Internal components for X-Ray Diagnostic Mode
    const engineBlockMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      roughness: 0.4,
      metalness: 0.8,
    });
    materialsRef.current['engine'] = engineBlockMat;

    // --- CAR CHASSIS GEOMETRY ---
    // Lower Main Body
    const bodyBaseGeo = new THREE.BoxGeometry(1.7, 0.45, 3.8);
    const bodyBase = new THREE.Mesh(bodyBaseGeo, carPaintMat);
    bodyBase.position.y = 0.05;
    bodyBase.castShadow = true;
    bodyBase.receiveShadow = true;
    carGroup.add(bodyBase);

    // Front Hood & Nose slope
    const hoodGeo = new THREE.BoxGeometry(1.64, 0.28, 1.4);
    const hood = new THREE.Mesh(hoodGeo, carPaintMat);
    hood.position.set(0, 0.22, 1.15);
    hood.rotation.x = -0.06;
    hood.castShadow = true;
    carGroup.add(hood);

    // Cabin Greenhouse & Roof
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.42, 1.7);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(0, 0.45, -0.15);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Panel (Carbon/Paint)
    const roofGeo = new THREE.BoxGeometry(1.36, 0.06, 1.4);
    const roof = new THREE.Mesh(roofGeo, carPaintMat);
    roof.position.set(0, 0.67, -0.15);
    roof.castShadow = true;
    carGroup.add(roof);

    // Front aggressive splitter
    const splitterGeo = new THREE.BoxGeometry(1.76, 0.05, 0.45);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(0, -0.16, 1.95);
    carGroup.add(splitter);

    // Rear Aero Diffuser
    const diffuserGeo = new THREE.BoxGeometry(1.68, 0.12, 0.35);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonMat);
    diffuser.position.set(0, -0.12, -1.95);
    carGroup.add(diffuser);

    // Rear Spoiler
    const spoilerWingGeo = new THREE.BoxGeometry(1.65, 0.04, 0.26);
    const spoilerWing = new THREE.Mesh(spoilerWingGeo, carbonMat);
    spoilerWing.position.set(0, 0.48, -1.82);
    spoilerWing.castShadow = true;
    carGroup.add(spoilerWing);

    // Spoiler Mounts
    [-0.55, 0.55].forEach((x) => {
      const mountGeo = new THREE.BoxGeometry(0.04, 0.18, 0.08);
      const mount = new THREE.Mesh(mountGeo, carbonMat);
      mount.position.set(x, 0.38, -1.82);
      carGroup.add(mount);
    });

    // Front Grille with racing badge
    const grilleGeo = new THREE.BoxGeometry(1.2, 0.2, 0.1);
    const grille = new THREE.Mesh(grilleGeo, carbonMat);
    grille.position.set(0, 0.05, 1.92);
    carGroup.add(grille);

    // Headlights (Angel eyes)
    [-0.64, 0.64].forEach((x) => {
      const lightGeo = new THREE.BoxGeometry(0.32, 0.08, 0.15);
      const headlight = new THREE.Mesh(lightGeo, headlightMat);
      headlight.position.set(x, 0.18, 1.88);
      carGroup.add(headlight);
    });

    // Taillights (Triple bar Detroit iconic look)
    [-0.6, 0.6].forEach((x) => {
      const tailGeo = new THREE.BoxGeometry(0.38, 0.1, 0.1);
      const taillight = new THREE.Mesh(tailGeo, taillightMat);
      taillight.position.set(x, 0.2, -1.91);
      carGroup.add(taillight);
    });

    // Dual Exhaust Tips
    [-0.45, 0.45].forEach((x) => {
      const exhaustGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.25, 16);
      const exhaust = new THREE.Mesh(exhaustGeo, chromeMat);
      exhaust.rotation.x = Math.PI / 2;
      exhaust.position.set(x, -0.2, -1.98);
      carGroup.add(exhaust);
    });

    // Side Mirrors
    [-0.88, 0.88].forEach((x) => {
      const mirrorGeo = new THREE.BoxGeometry(0.16, 0.08, 0.18);
      const mirror = new THREE.Mesh(mirrorGeo, carbonMat);
      mirror.position.set(x, 0.38, 0.45);
      carGroup.add(mirror);
    });

    // --- WHEELS, ROTORS & CALIPERS ---
    const wheelPositions = [
      { x: -0.92, z: 1.15, isFront: true },  // Front Left
      { x: 0.92, z: 1.15, isFront: true },   // Front Right
      { x: -0.92, z: -1.15, isFront: false }, // Rear Left
      { x: 0.92, z: -1.15, isFront: false },  // Rear Right
    ];

    wheelPositions.forEach((pos) => {
      const wheelSubGroup = new THREE.Group();
      wheelSubGroup.position.set(pos.x, -0.15, pos.z);

      // Rubber Tire
      const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.24, 28);
      tireGeo.rotateZ(Math.PI / 2);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      wheelSubGroup.add(tire);

      // Chrome Rim Rim
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.245, 24);
      rimGeo.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, chromeMat);
      wheelSubGroup.add(rim);

      // Slotted Brake Rotor
      const rotorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 20);
      rotorGeo.rotateZ(Math.PI / 2);
      const rotor = new THREE.Mesh(rotorGeo, chromeMat);
      rotor.position.x = pos.x > 0 ? -0.06 : 0.06;
      wheelSubGroup.add(rotor);

      // Performance Red Caliper
      const caliperGeo = new THREE.BoxGeometry(0.06, 0.11, 0.09);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(pos.x > 0 ? -0.06 : 0.06, 0.1, 0.08);
      wheelSubGroup.add(caliper);

      carGroup.add(wheelSubGroup);
    });

    // --- ENGINE BLOCK (VISIBLE IN X-RAY & BONNET SLICE) ---
    const engineBlockGeo = new THREE.BoxGeometry(0.8, 0.42, 0.85);
    const engineBlock = new THREE.Mesh(engineBlockGeo, engineBlockMat);
    engineBlock.position.set(0, 0.15, 1.1);
    engineBlock.name = 'engine_block';
    carGroup.add(engineBlock);

    // Battery pack
    const batteryGeo = new THREE.BoxGeometry(0.32, 0.22, 0.25);
    const batteryMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.3,
    });
    const battery = new THREE.Mesh(batteryGeo, batteryMat);
    battery.position.set(0.55, 0.25, 0.8);
    carGroup.add(battery);

    // Front Suspension Geometry Bars
    [-0.5, 0.5].forEach((x) => {
      const strutGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5);
      const strutMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8 });
      const strut = new THREE.Mesh(strutGeo, strutMat);
      strut.position.set(x, 0.08, 1.15);
      carGroup.add(strut);
    });

    setIsLoading(false);

    // 7. Render Loop with smooth camera damping
    let targetRotationY = -0.6;
    let targetRotationX = 0.25;

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDraggingRef.current) {
        targetRotationY += 0.0035;
      }

      // Smooth interpolation for rotation
      rotationTargetRef.current.y += (targetRotationY - rotationTargetRef.current.y) * 0.08;
      rotationTargetRef.current.x += (targetRotationX - rotationTargetRef.current.x) * 0.08;

      // Update camera orbital position
      const distance = cameraDistanceRef.current;
      const rotY = rotationTargetRef.current.y;
      const rotX = Math.max(0.08, Math.min(Math.PI / 2.2, rotationTargetRef.current.x));

      camera.position.x = distance * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = distance * Math.sin(rotX);
      camera.position.z = distance * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Interactive Mouse / Touch Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.005;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistanceRef.current = Math.max(3.0, Math.min(6.8, cameraDistanceRef.current + e.deltaY * 0.003));
    };

    // Touch Handlers for mobile responsiveness
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.007;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [autoRotate]);

  // Mode changer effect (Studio vs X-Ray vs Workshop)
  useEffect(() => {
    const paint = materialsRef.current['paint'] as THREE.MeshPhysicalMaterial | undefined;
    const glass = materialsRef.current['glass'] as THREE.MeshPhysicalMaterial | undefined;
    const scene = sceneRef.current;
    if (!paint || !glass || !scene) return;

    if (viewMode === 'xray') {
      paint.wireframe = true;
      paint.color.setHex(0x0284c7);
      glass.wireframe = true;
      scene.background = new THREE.Color(0x040810);
    } else if (viewMode === 'workshop') {
      paint.wireframe = false;
      paint.color.setHex(0x181010);
      glass.wireframe = false;
      scene.background = new THREE.Color(0x110808);
    } else {
      // Studio Noir default
      paint.wireframe = false;
      paint.color.setHex(0x12141c);
      glass.wireframe = false;
      scene.background = new THREE.Color(0x0a0c10);
    }
  }, [viewMode]);

  const handleHotspotClick = (hotspot: DiagnosticHotspot) => {
    setSelectedHotspot(hotspot);
    setAutoRotate(false);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0c10] shadow-2xl">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[460px] md:h-[540px] cursor-grab active:cursor-grabbing select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0c10] z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                Initializing 3D Automotive Bay...
              </span>
            </div>
          </div>
        )}

        {/* Top Control Bar inside 3D Viewport */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-10">
          {/* Mode Toggles */}
          <div className="flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('studio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'studio'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Studio Noir</span>
            </button>

            <button
              onClick={() => setViewMode('xray')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'xray'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span>Diagnostic X-Ray</span>
            </button>

            <button
              onClick={() => setViewMode('workshop')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'workshop'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Detroit Red Glow</span>
            </button>
          </div>

          {/* Orbit / Auto-rotate Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border backdrop-blur-md transition-colors flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-black/60 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">360° Spin</span>
            </button>
          </div>
        </div>

        {/* Interactive Hotspot Pills Bar */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto z-10 flex flex-col md:flex-row items-center justify-between gap-3 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Crosshair className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="hidden sm:inline">Interactive Diagnostic Telemetry:</span>
            <span className="text-white font-medium">Select Vehicle Subsystem</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {VEHICLE_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot?.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => handleHotspotClick(hotspot)}
                  className={`px-2.5 py-1 text-xs whitespace-nowrap rounded-lg font-medium transition-colors ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {hotspot.title.split('&')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Hotspot Deep-Dive Drawer */}
      {selectedHotspot && (
        <div className="p-5 md:p-6 bg-[#0e1017] border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                Subsystem Inspection
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs text-slate-300 font-mono">{selectedHotspot.system}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {selectedHotspot.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedHotspot.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Recognized Symptoms:</span>
              {selectedHotspot.symptoms.map((sym, idx) => (
                <span
                  key={idx}
                  className="text-xs text-slate-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/5"
                >
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Action to book or view this specific service */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectService(selectedHotspot.recommendedServiceId)}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Book Subsystem Inspection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
