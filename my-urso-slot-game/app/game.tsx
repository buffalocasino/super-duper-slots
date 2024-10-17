"use client";

import * as urso from '@urso/core';
import { MainScene } from './scenes/MainScene';

export default function Game() {
  useEffect(() => {
    const game = new urso.Game({
      width: 800,
      height: 600,
      // ... other game options
    });

    game.scene.add(MainScene);
    game.start();

    return () => {
      game.destroy();
    };
  }, []);

  return <div />;
}