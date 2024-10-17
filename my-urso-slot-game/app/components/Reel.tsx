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

    // Create a timeline for the spinning animation
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

    // You might want to add a subtle bounce effect here when the reel stops
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