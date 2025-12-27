import React, { useEffect, useRef } from 'react';

const LightningEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    interface Point {
      x: number;
      y: number;
    }

    interface Bolt {
      path: Point[];
      opacity: number;
      life: number;
      width: number;
    }

    let bolts: Bolt[] = [];
    let flashOpacity = 0;
    let nextStrikeTime = Math.random() * 200 + 100; // Frames until next strike

    const createBolt = (startX: number) => {
      const path: Point[] = [];
      let x = startX;
      let y = 0;
      
      path.push({ x, y });

      while (y < height) {
        const stepY = Math.random() * 20 + 10; // Vertical step
        const stepX = (Math.random() - 0.5) * 50; // Horizontal jaggedness
        
        x += stepX;
        y += stepY;
        path.push({ x, y });
        
        // Occasionally split? (Keep simple for now)
      }

      bolts.push({
        path,
        opacity: 1,
        life: 30, // Frames to live
        width: Math.random() * 2 + 1
      });

      // Trigger screen flash
      flashOpacity = 0.15; // Subtle white flash
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Screen Flash
      if (flashOpacity > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
        ctx.fillRect(0, 0, width, height);
        flashOpacity -= 0.01;
        if (flashOpacity < 0) flashOpacity = 0;
      }

      // 2. Manage Strikes
      nextStrikeTime--;
      if (nextStrikeTime <= 0) {
        createBolt(Math.random() * width);
        // Reset timer (random interval between 2 to 6 seconds approx at 60fps)
        nextStrikeTime = Math.random() * 300 + 120; 
      }

      // 3. Draw Bolts
      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        
        ctx.beginPath();
        ctx.moveTo(bolt.path[0].x, bolt.path[0].y);
        
        for (let j = 1; j < bolt.path.length; j++) {
          ctx.lineTo(bolt.path[j].x, bolt.path[j].y);
        }

        // Main Bolt Style (White center)
        ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.opacity})`;
        ctx.lineWidth = bolt.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Glow (Yellow Accent)
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(255, 238, 0, ${bolt.opacity})`; // #FFEE00 Accent
        
        ctx.stroke();
        
        // Reset shadow for next operations
        ctx.shadowBlur = 0;

        // Fade out
        bolt.opacity -= 0.04; // Fade speed
        bolt.life--;

        if (bolt.life <= 0 || bolt.opacity <= 0) {
          bolts.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
    />
  );
};

export default LightningEffect;