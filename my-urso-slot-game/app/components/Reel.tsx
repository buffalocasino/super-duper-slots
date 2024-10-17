import * as urso from '@urso/core';
import { useEffect, useState, useRef } from 'react';

interface ReelProps {
  x: number;
  y: number;
  symbols: string[];
}

export const Reel: React.FC<ReelProps> = ({ x, y, symbols }) => {
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spriteRef = useRef<urso.sprite.Sprite>(null);

  const spin = () => {
    setIsSpinning(true);

   
    const timeline = new urso.timeline.Timeline();
    timeline.add(spriteRef.current!, {
      rotation: 360 * 5, // Rotate 5 times
      duration: 1, // Animation duration 1 second
      easing: urso.easing.easeOutCubic, // Easing function for smooth animation
    });
    timeline.play();
  };

  const stopAtSymbol = (symbolIndex: number) => {
    setIsSpinning(false);
    setCurrentSymbolIndex(symbolIndex);
  
    // Add bounce effect
    const timeline = new urso.timeline.Timeline();
    timeline.add(spriteRef.current!, {
      scaleY: 0.9, // Scale down slightly
      duration: 0.1, // Short duration for the bounce
      easing: urso.easing.easeOutCubic,
    });
    timeline.add(spriteRef.current!, {
      scaleY: 1, // Scale back to original size
      duration: 0.1,
      easing: urso.easing.easeInCubic,
    });
    timeline.play();
  };
  

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setCurrentSymbolIndex((prevIndex) => (prevIndex + 1) % symbols.length);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSpinning, symbols.length]);

  return (
    <urso.sprite.Sprite
      ref={spriteRef}
      x={x}
      y={y}
      texture={symbols[currentSymbolIndex]}
    />
  );
};