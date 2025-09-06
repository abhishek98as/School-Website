
'use client';

import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface ConstellationOptions {
  star?: {
    color?: string;
    width?: number;
    randomWidth?: boolean;
  };
  line?: {
    color?: string;
    width?: number;
  };
  position?: {
    x: number;
    y: number;
  };
  velocity?: number;
  length?: number;
  distance?: number;
  radius?: number;
}

export function ParticleCanvas({ options }: { options?: ConstellationOptions }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const defaults: Required<ConstellationOptions> = {
      star: {
        color: 'rgba(255, 255, 255, 0.5)',
        width: 1,
        randomWidth: true,
      },
      line: {
        color: 'rgba(255, 255, 255, 0.2)',
        width: 0.2,
      },
      position: {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
      },
      velocity: 0.1,
      length: 100,
      distance: 120,
      radius: 150,
    };

    const config = { ...defaults, ...options };
    const stars: Star[] = [];
    let rAF: number;

    const setCanvas = () => {
      const parent = canvas.parentElement;
      if(parent){
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const setContext = () => {
      context.fillStyle = config.star.color || defaults.star.color;
      context.strokeStyle = config.line.color || defaults.line.color;
      context.lineWidth = config.line.width || defaults.line.width;
    };
    
    const createStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (config.velocity || defaults.velocity) - Math.random() * 0.5,
      vy: (config.velocity || defaults.velocity) - Math.random() * 0.5,
      radius: (config.star?.randomWidth ? Math.random() * (config.star.width || defaults.star.width) : config.star?.width) || 1,
    });
    
    const drawStar = (star: Star) => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        context.fill();
    };

    const animateStars = () => {
      stars.forEach(star => {
        if (star.y < 0 || star.y > canvas.height) {
          star.vy = -star.vy;
        } else if (star.x < 0 || star.x > canvas.width) {
          star.vx = -star.vx;
        }
        star.x += star.vx;
        star.y += star.vy;
      });
    };
    
    const drawLines = () => {
      for (let i = 0; i < stars.length; i++) {
        for (let j = 0; j < stars.length; j++) {
          const iStar = stars[i];
          const jStar = stars[j];
          const distance = config.distance || defaults.distance;
          const radius = config.radius || defaults.radius;

          if (
            Math.abs(iStar.x - jStar.x) < distance &&
            Math.abs(iStar.y - jStar.y) < distance
          ) {
            if (
              Math.abs(iStar.x - config.position.x) < radius &&
              Math.abs(iStar.y - config.position.y) < radius
            ) {
              context.beginPath();
              context.moveTo(iStar.x, iStar.y);
              context.lineTo(jStar.x, jStar.y);
              context.stroke();
              context.closePath();
            }
          }
        }
      }
    };


    const loop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(drawStar);
      drawLines();
      animateStars();
      rAF = window.requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        config.position.x = e.clientX - rect.left;
        config.position.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      window.cancelAnimationFrame(rAF);
      init();
    };
    
    const init = () => {
      setCanvas();
      setContext();
      stars.length = 0;
      for (let i = 0; i < (config.length || defaults.length); i++) {
        stars.push(createStar());
      }
      config.position = { x: canvas.width / 2, y: canvas.height / 2 };
      loop();
    };

    init();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(rAF);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };

  }, [options]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }} />;
}
