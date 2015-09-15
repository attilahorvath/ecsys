# Ecsys
A simple, extendable JavaScript game engine powered by the entity-component-system pattern.

As Ecsys is only a few days old, it should not be considered to be even in a pre-alpha state. At this point everything can (and quite possibly will) change regarding its architecture, implementation and API. However, I really hope I can make something useful out of it which could help me and possibly others quickly prototype and power small-scaled browser games.

I will write a detailed documentation and tutorials explaining how to use it once the engine reaches at least some semblance of stability. Until then, the included examples should serve as the de facto API documentation.

## Example games
- [BlockBuster](https://rawgit.com/attilahorvath/ecsys/master/examples/block_buster/block_buster.html), a Breakout clone (not yet playable)
- [TwinTanks](https://rawgit.com/attilahorvath/ecsys/master/examples/twin_tanks/twin_tanks.html), a split screen multiplayer shooter with tanks (not yet playable)

## Project priorities / To-Do List
- Click event, mouse buttons
- Add justPressed, justReleased to KeyboardInputSystem
- Extended KeyboardInputSystem preventDefault configuration - ability to let e.g. refresh event through while capturing others
- Composite entities - entities that are made up of other entities, such as a tank base and turret
- Sprites that are drawn straight to the canvas without cameras - useful for UI elements
- Entity templates - named collection of components, can spawn instances
- Game states with transitions
- Tree-view for entities and their components
- FPS counter
- Audio
- JSON import/export of entities and their components
- More easing functions
- Preload images, images loaded event
- AABB collisions, basic physics
- UI elements
- Z-indexing
- Tilemaps
- Particles
- Fix sprite clipping with rotated camera
- Chained animations
- Scale effects
- Scene graph for collision handling
- Full screen
- Pointer lock
- Screenshots
- Saving/loading (JSON serialize components)
- Playbacks - record input data with timings
- Save and restore randomizer seed - important for playbacks, networking
- Dynamically sized canvas, full-window canvas
- Debug mode, console log statements - component manipulations, entities, systems, etc.
- Events for entity/component manipulations
- Sprite frame-by-frame animations
- Trail component (ball trail, tank trail on the grass)
- Consolidate components (position-size-offset-constraints?)
- Look into [Electron](https://github.com/atom/electron) for creating desktop games with Ecsys
- Set up some build system to automatically generate minified version of the code
- Make more sample games

Ecsys is licensed under the included MIT license.

Made with :beer: in rainy Budapest.
