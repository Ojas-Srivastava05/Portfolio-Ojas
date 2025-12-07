import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Shuffle.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  ease = 'power3.out',
  threshold = 0.1,
  tag = 'h1',
  textAlign = 'center',
  shuffleTimes = 1,
  stagger = 0.03,
  scrambleCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  triggerOnce = true,
}) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      if (!ref.current || !text) return;

      const chars = text.split('');
      const container = ref.current;
      container.innerHTML = '';

      const charElements = chars.map((char, i) => {
        const span = document.createElement('span');
        span.className = 'shuffle-char';
        span.style.display = 'inline-block';
        span.textContent = char === ' ' ? '\u00A0' : char;
        container.appendChild(span);
        return span;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top ${(1 - threshold) * 100}%`,
          once: triggerOnce,
        }
      });

      charElements.forEach((el, i) => {
        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const originalChar = chars[i];
        
        tl.to(el, {
          duration: duration,
          ease: ease,
          onStart: () => {
            let count = 0;
            const interval = setInterval(() => {
              if (count < rolls && scrambleCharset) {
                el.textContent = scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)];
              } else {
                el.textContent = originalChar === ' ' ? '\u00A0' : originalChar;
                clearInterval(interval);
              }
              count++;
            }, duration * 1000 / rolls);
          }
        }, i * stagger);
      });

      setReady(true);
    },
    { dependencies: [text, duration, ease, threshold, shuffleTimes, stagger, scrambleCharset, triggerOnce], scope: ref }
  );

  const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(() => `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`, [ready, className]);

  const Tag = tag || 'h1';
  return React.createElement(Tag, { ref, className: classes, style: commonStyle });
};

export default Shuffle;
