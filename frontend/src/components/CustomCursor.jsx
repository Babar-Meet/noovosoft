import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.matches('a, button, [data-hover], input, textarea')) {
        isHovering.current = true;
        if (ringRef.current) ringRef.current.classList.add('hover');
        if (dotRef.current) dotRef.current.classList.add('hover');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.matches('a, button, [data-hover], input, textarea')) {
        isHovering.current = false;
        if (ringRef.current) ringRef.current.classList.remove('hover');
        if (dotRef.current) dotRef.current.classList.remove('hover');
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      if (ringRef.current) ringRef.current.classList.add('click');
      if (dotRef.current) dotRef.current.classList.add('click');
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      if (ringRef.current) ringRef.current.classList.remove('click');
      if (dotRef.current) dotRef.current.classList.remove('click');
    };

    const animate = () => {
      const target = mousePos.current;
      const current = ringPos.current;
      
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.left = `${current.x}px`;
        ringRef.current.style.top = `${current.y}px`;
      }
      
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="cursor-container">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
    </div>
  );
};

export default CustomCursor;
