# ecsys
A simple, extendable JavaScript game engine powered by the entity-component-system pattern

As Ecsys is only a few days old, it should not be considered to be even in a pre-alpha state. At this point everything can (and quite possibly will) change regarding its architecture, implementation and API. However,I really hope I can make something useful out of it which could help me and possibly others quickly prototype and power small-scaled browser games.

I will write a detailed documentation and tutorials explaining how to use it once the engine reaches at least some semblance of stability. Until then, the included examples should serve as the de facto API documentation.

## Project priorities / To-Do List
- Set up some build system to automatically generate minified version of the code
- Component filter attribute for systems, Game should call update/draw with a filtered list of entities instead of having the systems do the filtering for themselves
- Make sample games - split screen shooter, breakout
- Entity templates - named collection of components, can spawn instances
- System configuration options - e.g. MouseInput restricting position or not?
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
- Rotating, angles
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
- Trail component (ball trail)
- Consolidate components (position-size-offset-constraints?)

Ecsys is licensed under the included MTI license.

Made with :beer: in rainy Budapest.