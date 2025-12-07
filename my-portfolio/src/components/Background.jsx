import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MLMatrixBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll();
  const rafRef = useRef();
  
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  useEffect(() => {
    let lastUpdate = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate > 50) { // Throttle to 20fps
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setMousePos({ 
            x: (e.clientX / window.innerWidth) * 100, 
            y: (e.clientY / window.innerHeight) * 100 
          });
        });
        lastUpdate = now;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Reduced code streams from 12 to 6
  const [codeStreams] = useState(() => 
    [...Array(6)].map((_, i) => ({
      id: i,
      x: (i * 16) % 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  );

  // Reduced neural network nodes from 40 to 15
  const [networkNodes] = useState(() =>
    [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  const mlCode = ['fit()', '0.98', 'train', 'loss', 'epoch'];

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      {/* Static gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(127, 29, 29, 0.12) 0%, transparent 50%)',
        }}
      />

      {/* Reduced matrix code rain from 12 to 6 streams */}
      {codeStreams.map((stream) => (
        <div
          key={stream.id}
          className="absolute top-0 opacity-35"
          style={{ left: `${stream.x}%`, transform: 'translateZ(0)' }}
        >
          <motion.div
            className="flex flex-col gap-4 text-red-500 font-mono text-xs"
            initial={{ y: -400 }}
            animate={{ y: '110vh' }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              delay: stream.delay,
              ease: 'linear',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ opacity: 1 - (i * 0.15) }}>
                {mlCode[Math.floor((Math.random() * mlCode.length))]}
              </div>
            ))}
          </motion.div>
        </div>
      ))}

      {/* Optimized neural network - reduced nodes and connections */}
      <svg className="absolute inset-0 w-full h-full opacity-25">
        <defs>
          <linearGradient id="lineGradient">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Reduced connections - only draw close nodes */}
        {networkNodes.map((node, i) =>
          networkNodes.slice(i + 1, i + 4).map((target, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
            );
            if (distance < 30) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  filter="url(#glow)"
                  opacity="0.6"
                />
              );
            }
            return null;
          })
        )}
        
        {/* Only draw lines to mouse for nearest 3 nodes */}
        {networkNodes
          .map((node, i) => ({
            ...node,
            i,
            dist: Math.sqrt(Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2))
          }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3)
          .map(({ x, y, i, dist }) => {
            if (dist < 40) {
              return (
                <motion.line
                  key={`mouse-${i}`}
                  x1={`${x}%`}
                  y1={`${y}%`}
                  x2={`${mousePos.x}%`}
                  y2={`${mousePos.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              );
            }
            return null;
          })}
        
        {/* Simplified nodes */}
        {networkNodes.map((node, i) => (
          <circle
            key={i}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="#dc2626"
            filter="url(#glow)"
            opacity="0.7"
          />
        ))}
        
        {/* Mouse indicator */}
        <circle
          cx={`${mousePos.x}%`}
          cy={`${mousePos.y}%`}
          r="5"
          fill="#ef4444"
          filter="url(#glow)"
          opacity="0.8"
        />
      </svg>

      {/* Reduced floating particles from 15 to 6 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute text-red-600 font-mono text-xs opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          {Math.random() > 0.5 ? `0x${Math.floor(Math.random() * 0xFF).toString(16)}` : '01'}
        </motion.div>
      ))}

      {/* Static grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Reduced glow orbs from 4 to 2 */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${350 + i * 100}px`,
            height: `${350 + i * 100}px`,
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, rgba(239, 68, 68, 0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: [`${10 + i * 30}vw`, `${60 - i * 20}vw`, `${10 + i * 30}vw`],
            y: [`${20 + i * 20}vh`, `${70 - i * 30}vh`, `${20 + i * 20}vh`],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
        />
      ))}

      {/* Single scanline */}
      <motion.div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-10"
        style={{ filter: 'blur(1px)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-50 pointer-events-none" />
    </div>
  );
}