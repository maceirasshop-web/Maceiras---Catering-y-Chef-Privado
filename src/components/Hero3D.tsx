import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF5F2ED, 0.032);

    // 2. Camera setup - Pulled back with conservative FOV to guarantee zero clipping
    const camera = new THREE.PerspectiveCamera(26, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 9.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 4. Gourmet Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFAF4, 1.6);
    scene.add(ambientLight);

    // Main warm key light
    const keyLight = new THREE.DirectionalLight(0xFFF6E8, 2.8);
    keyLight.position.set(3.5, 6.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.bias = -0.0002;
    scene.add(keyLight);

    // Warm terracotta rim light from rear-left
    const rimLight = new THREE.DirectionalLight(0xD27D56, 1.4);
    rimLight.position.set(-4.5, 2.5, -3.5);
    scene.add(rimLight);

    // Soft olive/sage fill light
    const fillLight = new THREE.PointLight(0x5A5A40, 0.9, 12);
    fillLight.position.set(-3, 2.5, 3);
    scene.add(fillLight);

    // Center spotlight highlight
    const centerSpot = new THREE.PointLight(0xFFEADB, 1.5, 8);
    centerSpot.position.set(0, 3, 2);
    scene.add(centerSpot);

    // 5. High-End Materials
    const finePorcelainMat = new THREE.MeshStandardMaterial({
      color: 0xFCFAFA,
      roughness: 0.08,
      metalness: 0.04,
    });

    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.16,
      metalness: 0.92,
    });

    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xEDEDED,
      roughness: 0.12,
      metalness: 0.95,
    });

    const darkSlateMat = new THREE.MeshStandardMaterial({
      color: 0x2A2A2A,
      roughness: 0.4,
      metalness: 0.1,
    });

    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.25,
      roughness: 0.02,
      transmission: 0.95,
      thickness: 0.8,
      ior: 1.52,
    });

    // 6. Dishes & Tableware Container
    const tablewareGroup = new THREE.Group();
    scene.add(tablewareGroup);

    // ==========================================
    // ITEM 1: PLATO PRINCIPAL DE PRESENTACIÓN Y BASE DE PIEDRA (Centro)
    // ==========================================
    const centerGroup = new THREE.Group();

    // Dark Slate Pedestal
    const slateGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.08, 64);
    const slate = new THREE.Mesh(slateGeo, darkSlateMat);
    slate.position.y = -0.04;
    slate.castShadow = true;
    slate.receiveShadow = true;
    centerGroup.add(slate);

    // Main Fine Porcelain Charger Plate
    const chargerGeo = new THREE.CylinderGeometry(1.15, 0.7, 0.11, 64);
    const charger = new THREE.Mesh(chargerGeo, finePorcelainMat);
    charger.position.y = 0.055;
    charger.castShadow = true;
    charger.receiveShadow = true;
    centerGroup.add(charger);

    // Outer Gold Rim
    const outerGoldRimGeo = new THREE.TorusGeometry(1.12, 0.016, 16, 64);
    const outerGoldRim = new THREE.Mesh(outerGoldRimGeo, polishedGoldMat);
    outerGoldRim.rotation.x = Math.PI / 2;
    outerGoldRim.position.y = 0.111;
    centerGroup.add(outerGoldRim);

    // Inner Inset Porcelain Plate
    const innerPlateGeo = new THREE.CylinderGeometry(0.8, 0.72, 0.04, 48);
    const innerPlate = new THREE.Mesh(innerPlateGeo, finePorcelainMat);
    innerPlate.position.y = 0.125;
    innerPlate.castShadow = true;
    innerPlate.receiveShadow = true;
    centerGroup.add(innerPlate);

    // Inner Gold Filigree Accent Ring
    const innerGoldRimGeo = new THREE.TorusGeometry(0.78, 0.01, 16, 64);
    const innerGoldRim = new THREE.Mesh(innerGoldRimGeo, polishedGoldMat);
    innerGoldRim.rotation.x = Math.PI / 2;
    innerGoldRim.position.y = 0.146;
    centerGroup.add(innerGoldRim);

    centerGroup.position.set(0, -0.35, 0.2);
    centerGroup.rotation.x = 0.42;
    centerGroup.rotation.z = -0.04;
    tablewareGroup.add(centerGroup);

    // ==========================================
    // ITEM 2: CLOCHE / CAMPANA GASTRONÓMICA DE PRESENTACIÓN (Derecha)
    // ==========================================
    const clocheGroup = new THREE.Group();

    // Silver Tray
    const trayGeo = new THREE.CylinderGeometry(0.72, 0.46, 0.07, 48);
    const tray = new THREE.Mesh(trayGeo, brushedSilverMat);
    tray.castShadow = true;
    tray.receiveShadow = true;
    clocheGroup.add(tray);

    // Gold Rim on Tray
    const trayRimGeo = new THREE.TorusGeometry(0.7, 0.015, 16, 48);
    const trayRim = new THREE.Mesh(trayRimGeo, polishedGoldMat);
    trayRim.rotation.x = Math.PI / 2;
    trayRim.position.y = 0.036;
    clocheGroup.add(trayRim);

    // Crystal Glass Cloche Dome
    const domeGeo = new THREE.SphereGeometry(0.56, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const dome = new THREE.Mesh(domeGeo, crystalGlassMat);
    dome.position.y = 0.035;
    clocheGroup.add(dome);

    // Gold Cloche Knob
    const knobGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const knob = new THREE.Mesh(knobGeo, polishedGoldMat);
    knob.position.y = 0.59;
    clocheGroup.add(knob);

    // Internal Porcelain Dish Base inside Cloche
    const clocheDishGeo = new THREE.CylinderGeometry(0.35, 0.3, 0.04, 32);
    const clocheDish = new THREE.Mesh(clocheDishGeo, finePorcelainMat);
    clocheDish.position.y = 0.055;
    clocheGroup.add(clocheDish);

    clocheGroup.position.set(1.1, 0.62, -0.3);
    clocheGroup.rotation.x = 0.45;
    clocheGroup.rotation.y = -0.22;
    tablewareGroup.add(clocheGroup);

    // ==========================================
    // ITEM 3: RAMEKÍN DE DEGUSTACIÓN Y CUBIERTOS DE ORO (Izquierda)
    // ==========================================
    const tastingGroup = new THREE.Group();

    // Ramekin / Bowl Base
    const ramekinGeo = new THREE.CylinderGeometry(0.48, 0.38, 0.3, 32);
    const ramekin = new THREE.Mesh(ramekinGeo, finePorcelainMat);
    ramekin.castShadow = true;
    ramekin.receiveShadow = true;
    tastingGroup.add(ramekin);

    // Gold Rim on Ramekin
    const ramekinRimGeo = new THREE.TorusGeometry(0.47, 0.012, 16, 32);
    const ramekinRim = new THREE.Mesh(ramekinRimGeo, polishedGoldMat);
    ramekinRim.rotation.x = Math.PI / 2;
    ramekinRim.position.y = 0.151;
    tastingGroup.add(ramekinRim);

    // Gold Spoon Handle
    const spoonHandleGeo = new THREE.CylinderGeometry(0.009, 0.012, 0.54, 8);
    const spoonHandle = new THREE.Mesh(spoonHandleGeo, polishedGoldMat);
    spoonHandle.rotation.z = 1.35;
    spoonHandle.rotation.x = 0.18;
    spoonHandle.position.set(0.4, 0.04, 0.08);
    tastingGroup.add(spoonHandle);

    // Gold Spoon Bowl
    const spoonBowlGeo = new THREE.SphereGeometry(0.06, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const spoonBowl = new THREE.Mesh(spoonBowlGeo, polishedGoldMat);
    spoonBowl.rotation.x = -Math.PI / 2;
    spoonBowl.position.set(0.15, 0.04, 0.22);
    tastingGroup.add(spoonBowl);

    // Crystal Water/Wine Degustation Glass next to Ramekin
    const glassBaseGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24);
    const glassBase = new THREE.Mesh(glassBaseGeo, crystalGlassMat);
    glassBase.position.set(-0.52, -0.12, -0.15);
    tastingGroup.add(glassBase);

    const glassStemGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.32, 12);
    const glassStem = new THREE.Mesh(glassStemGeo, crystalGlassMat);
    glassStem.position.set(-0.52, 0.04, -0.15);
    tastingGroup.add(glassStem);

    const glassCupGeo = new THREE.CylinderGeometry(0.2, 0.12, 0.35, 24, 1, true);
    const glassCup = new THREE.Mesh(glassCupGeo, crystalGlassMat);
    glassCup.position.set(-0.52, 0.32, -0.15);
    tastingGroup.add(glassCup);

    tastingGroup.position.set(-1.08, 0.48, -0.3);
    tastingGroup.rotation.x = 0.42;
    tastingGroup.rotation.y = 0.28;
    tablewareGroup.add(tastingGroup);

    // 7. Atmospheric Floating Gold Particles (Bokeh)
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 6;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD27D56,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Floor Shadow Receiver Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(30, 30);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.075 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.6;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 8. Interactive Mouse Parallax & Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.4;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation with subtle floating movement
      tablewareGroup.rotation.y = mouseX * 0.25 + Math.sin(elapsedTime * 0.2) * 0.025;
      tablewareGroup.rotation.x = -mouseY * 0.18 + Math.cos(elapsedTime * 0.15) * 0.02;

      // Organic gentle vertical bobbing per item
      centerGroup.position.y = -0.35 + Math.sin(elapsedTime * 1.1) * 0.04;
      centerGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.04;

      clocheGroup.position.y = 0.62 + Math.sin(elapsedTime * 0.85 + 1) * 0.04;
      clocheGroup.rotation.z = Math.cos(elapsedTime * 0.5) * 0.03;

      tastingGroup.position.y = 0.48 + Math.sin(elapsedTime * 1.0 + 2) * 0.04;
      tastingGroup.rotation.x = 0.42 + Math.sin(elapsedTime * 0.6) * 0.025;

      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      [slateGeo, chargerGeo, outerGoldRimGeo, innerPlateGeo, innerGoldRimGeo, trayGeo, trayRimGeo, domeGeo, knobGeo, clocheDishGeo, ramekinGeo, ramekinRimGeo, spoonHandleGeo, spoonBowlGeo, glassBaseGeo, glassStemGeo, glassCupGeo, particleGeo, shadowPlaneGeo].forEach(g => g.dispose());
      [finePorcelainMat, polishedGoldMat, brushedSilverMat, darkSlateMat, crystalGlassMat, particleMat, shadowPlaneMat].forEach(m => m.dispose());
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[460px] md:h-[580px] relative flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
      aria-label="Escena 3D interactiva de vajilla fina y presentación gastronómica Maceiras"
    >
      {/* Soft warm background ambient halo */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-[#EADDCA]/30 via-transparent to-[#D27D56]/15 blur-3xl opacity-70" />
      </div>
    </div>
  );
};
