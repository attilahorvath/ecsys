# Ecsys

A simple, extendable JavaScript game engine powered by the entity-component-system pattern.

As Ecsys is in its very early stage of development, it should not be considered to be even in a pre-alpha state. At this point everything can (and quite possibly will) change regarding its architecture, implementation and API. However, I really hope I can make something useful out of it which could help me and possibly others quickly prototype and power small-scale browser games.

I will write a detailed documentation and tutorials explaining how to use it once the engine reaches at least some semblance of stability. Until then, the included sample games should serve as the de facto API documentation.

## Update 12/7/2015

I have decided to rewrite the entire thing using modern JavaScript tools. The code in the `master` branch should now be considered abandoned as all new development will take place in the `rewrite` branch which will be merged into `master` once it becomes mature enough.

## Sample games
- [BlockBuster](https://rawgit.com/attilahorvath/ecsys/master/samples/block_buster/block_buster.html), a Breakout clone (not yet playable)
- [TwinTanks](https://rawgit.com/attilahorvath/ecsys/master/samples/twin_tanks/twin_tanks.html), a split screen multiplayer shooter with tanks (not yet playable)
- [LockSmith](https://rawgit.com/attilahorvath/ecsys/master/samples/lock_smith/lock_smith.html), a Pop the Lock clone

## Project priorities / To-Do List
- Component manipulation functions should accept entity names as well as IDs
- Clone entity function
- Replace componentMasks bitfield with some other solution because currently it can only support 32 bits
- Make InviziMaze - sample game about navigating through an invisible maze
- Make Circular pong sample game
- Make Flappy Bird clone sample game
- Set background color
- AngularAccelaration
- StrokeColor, FillColor for text, rects, polygon drawing
- Font loader/cache, like ImageCache
- Inject game dependency into input handlers
- Skew component
- Error reporting - wrong component name, nonexistent property, etc.
- Delete expired timers
- Acceleration component
- Extended KeyboardInputSystem preventDefault configuration - ability to let e.g. refresh event through while capturing others
- Mobile support - touch input, viewport changes, etc.
- Game states with transitions
- Tree-view for entities and their components
- FPS counter
- Audio
- JSON import/export of entities and their components
- More easing functions
- Preload images, images loaded event
- OBB collisions - separating axis theorem, use AABB whenever possible (no Rotation component)
- Support for arbitrary convex polygons
- Basic physics
- Basic ray casting
- UI elements
- Z-indexing
- Tilemaps
- Particles
- Fix sprite clipping with applied transformations (rotate, scale)
- Chained animations
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
- WebGL rendering support

Ecsys is licensed under the included MIT license.

Made with :beer: in rainy Budapest.
