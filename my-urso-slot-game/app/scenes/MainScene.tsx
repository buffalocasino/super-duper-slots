import * as urso from '@urso/core';
import { Reel } from '../components/Reel';
import { Button } from '../components/Button';
import { getRandomSymbolIndex } from '../utils/Random';
import config from '../config';

export const MainScene: React.FC = () => {
  const reels: any[] = []; // Store Reel instances

  const handleSpin = () => {
    reels.forEach((reel) => {
      reel.spin();

      // Simulate stopping after a short delay
      setTimeout(() => {
        const randomSymbolIndex = getRandomSymbolIndex(config.symbols);
        reel.stopAtSymbol(randomSymbolIndex);
      }, 1000); // Stop after 1 second
    });
  };

  return (
    <urso.scene.Scene>
      {/* Create 5 reels and store references */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Reel
          ref={(ref) => reels.push(ref)}
          key={i}
          x={i * 100}
          y={100}
          symbols={config.symbols}
        />
      ))}

      <Button onClick={handleSpin} text="Spin" />
    </urso.scene.Scene>
  );
};