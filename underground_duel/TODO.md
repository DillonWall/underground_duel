

## TODO
<!-- - Check out Gulp -->
<!-- - Check out SCSS -->
<!-- - Decide on tech stack for project (HTML, TypeScript) -->
<!-- - Setup typescript to also work with HTML and others -->
<!-- - Find tutorials -->
<!-- - create comments describing files to implement
    - https://levelup.gitconnected.com/gamedev-patterns-and-algorithms-in-action-with-typescript-game-loop-2-2-c0d57a8e5ec2
- implement using the following as a guide (better way of actually writing the code, but other ref is better for architecture)
    - https://iamschulz.com/writing-a-game-in-typescript/ -->
<!-- - Use a tileset in tilemap and display tiles via their tileset index -->
<!-- - Switch to proper setup with express server -->
<!-- - Import tilesets from file (created with Tiled) -->
<!-- - Import tilemaps from file (created with Tiled) -->
<!-- - Consolidate file structure -->
<!-- - Add a scale factor to all images and tile locations -->
<!-- - Add animations to tiles -->
<!-- - Add Sprite class -->
<!-- - Add a playable character
    - Keybindings -->
<!-- - Add a camera that follows the player -->
<!-- - Fix game not resetting when server resets -->
<!-- - Fix tile drawing between pixels causing a line between them when moving the camera -->
- Add collision detection
    - Look into the collision stuff in Tiled
<!-- - Add animated tiles
    - Look into the animated tiles in Tiled -->
- Sound effects and music
- Player animations and attacks
- GameStateManager
- Basic start menu
- Loading
- Gamepad support?
- Enemies
    - Pathfinding / AI
- Health and damage
- Spells/Abilities
- Multiplayer lobby
- Multiplayer gameplay (client-server)
    <!-- - https://github.com/Tom32i/netcode -->
    <!-- - https://www.youtube.com/watch?v=0NLe4IpdS1w -->
    <!-- - May want to use GGPO rollback netcode
        - There is a version written in rust:
            - https://github.com/HouraiTeahouse/backroll-rs
        - Can call Rust code via JS:
            - https://opensource.com/article/19/3/calling-rust-javascript -->
    <!-- - Check out Web RTC (p2p) (if can't do this, then have to use web sockets which is client-server, or maybe even some kind of rust custom server backend)
        - https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
        - https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7
        - https://github.com/rameshvarun/netplayjs seems to use WebRTC + rollback -->
    - I think its best to just go with websockets which is client-server
    - Show other player actions and animations
    - Damage each other
    - When one player loses all health, the other one wins
    - Victory/Lose screen







