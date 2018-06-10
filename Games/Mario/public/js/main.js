import Compositor from "./compositor.js";
import Timer from "./timer.js";
import Entity from "./entity.js";
import { loadLevel } from "./loaders.js";
import { createMario } from "./entities.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, lvl]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(
      lvl.backgrounds,
      backgroundSprites
    );
    comp.layers.push(backgroundLayer);

    const gravity = 2000;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      mario.update(deltaTime);
      comp.draw(context);
      mario.vel.y += gravity * deltaTime;
    };

    timer.start();
  }
);
