import React, { useEffect, useRef } from 'react';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setSize();
    window.addEventListener('resize', setSize);

    // Particles
    const particles: { x: number; y: number; z: number; size: number }[] = [];
    const particleCount = 100;
    const depth = 2000;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * depth,
        size: Math.random() * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const scrollY = window.scrollY || 0;

      particles.forEach((p) => {
        // Wrap around logic for infinite scroll effect
        // We simulate moving "forward" or "down" through the field based on scroll
        let zPos = (p.z - scrollY * 0.8); 
        // Modulo to keep zPos within view range, but handle negative scroll
        zPos = ((zPos % depth) + depth) % depth;
        
        const scale = 500 / (500 + zPos);
        const x2d = (width / 2) + p.x * scale;
        const y2d = (height / 2) + p.y * scale;

        // Draw particle
        const alpha = Math.min(1, (depth - zPos) / (depth * 0.2)); // Fade in/out
        
        if (alpha > 0) {
             ctx.fillStyle = `rgba(255, 102, 0, ${alpha * 0.8})`; // Primary orange tint
             
             if (Math.random() > 0.98) {
                  ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`; // Subtle gray sparkle for light mode
             }

             ctx.beginPath();
             ctx.arc(x2d, y2d, p.size * scale * 2, 0, Math.PI * 2);
             ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default Background3D;