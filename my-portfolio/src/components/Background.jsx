import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MLMatrixBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll();
  
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate matrix code streams with randomized positions that change
  const [codeStreams] = useState(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      x: (i * 8) % 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  );

  // Neural network nodes - increased for more connections
  const [networkNodes] = useState(() =>
    [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  // ML-themed code snippets
  const mlCode = [
    'fit()',
    '0.98',
    'train',
    'loss',
    'epoch',
    'Conv2D',
    'Dense',
    'ReLU',
    'batch',
    'grad',
    'tensor',
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      {/* Animated gradient background that changes on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.25, 0.5, 0.75, 1],
            [
              'radial-gradient(ellipse at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(127, 29, 29, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 20%, rgba(239, 68, 68, 0.17) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(185, 28, 28, 0.14) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 80%, rgba(220, 38, 38, 0.16) 0%, transparent 50%), radial-gradient(ellipse at 20% 20%, rgba(153, 27, 27, 0.13) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 70%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(127, 29, 29, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.14) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, rgba(185, 28, 28, 0.11) 0%, transparent 50%)',
            ]
          ),
        }}
      />

      {/* Matrix code rain - with autonomous updates */}
      {codeStreams.map((stream) => (
        <div
          key={stream.id}
          className="absolute top-0 opacity-35 will-change-transform"
          style={{ left: `${stream.x}%` }}
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
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i} 
                style={{ opacity: 1 - (i * 0.12) }}
                animate={{
                  opacity: [1 - (i * 0.12), 0.8 - (i * 0.12), 1 - (i * 0.12)]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                {mlCode[Math.floor((Math.random() * mlCode.length))]}
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}

      {/* Neural network visualization - converging to mouse */}
      <svg className="absolute inset-0 w-full h-full opacity-25">
        <defs>
          <motion.linearGradient
            id="lineGradient"
            animate={{
              x1: ['0%', '100%'],
              x2: ['100%', '0%'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </motion.linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Lines between nodes */}
        {networkNodes.map((node, i) =>
          networkNodes.slice(i + 1).map((target, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
            );
            if (distance < 35 && Math.random() > 0.5) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.9, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Lines from nodes to mouse position */}
        {networkNodes.map((node, i) => {
          const distanceToMouse = Math.sqrt(
            Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2)
          );
          if (distanceToMouse < 40) {
            return (
              <motion.line
                key={`mouse-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${mousePos.x}%`}
                y2={`${mousePos.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.7]
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            );
          }
          return null;
        })}
        
        {/* Nodes */}
        {networkNodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="4"
            fill="#dc2626"
            filter="url(#glow)"
            animate={{
              r: [3, 5, 3],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Mouse position indicator */}
        <motion.circle
          cx={`${mousePos.x}%`}
          cy={`${mousePos.y}%`}
          r="6"
          fill="#ef4444"
          filter="url(#glow)"
          animate={{
            r: [5, 8, 5],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Floating data particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute text-red-600 font-mono text-xs opacity-25 will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.cos(i) * 30, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        >
          {Math.random() > 0.5 ? `0x${Math.floor(Math.random() * 0xFF).toString(16)}` : '01'}
        </motion.div>
      ))}

      {/* Terminal-style grid overlay that pulses on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: glowIntensity,
        }}
      />

      {/* Autonomous floating glow orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${300 + i * 50}px`,
            height: `${300 + i * 50}px`,
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(239, 68, 68, 0.08) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            x: [
              `${10 + i * 20}vw`,
              `${60 - i * 15}vw`,
              `${10 + i * 20}vw`,
            ],
            y: [
              `${20 + i * 15}vh`,
              `${70 - i * 20}vh`,
              `${20 + i * 15}vh`,
            ],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Multiple scanlines at different speeds */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-15"
          style={{
            top: useTransform(scrollYProgress, [0, 1], [`${i * 50}%`, `${100 - i * 20}%`]),
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-50 pointer-events-none" />
    </div>
  );
}