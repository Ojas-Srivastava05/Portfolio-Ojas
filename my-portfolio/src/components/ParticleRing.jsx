import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../utils/particleUtils";

const ParticleRing = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh", width: "100vw" }}
        className="bg-black"
      >
        <OrbitControls 
          maxDistance={20} 
          minDistance={10} 
          enableZoom={true} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        {/* Enhanced red-tinted lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ef4444" />
        <pointLight position={[-30, 0, -30]} intensity={50} color="#ef4444" />
        <pointLight position={[30, 0, 30]} intensity={40} color="#dc2626" />
        <pointLight position={[0, 20, 0]} intensity={30} color="#f87171" />
        
        <PointCircle />
      </Canvas>
      
      {/* Gradient overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      
      {/* Vignette effect around edges */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)'
        }}
      />
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
