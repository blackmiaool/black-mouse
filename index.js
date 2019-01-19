const ioHook = require('iohook');
const robot = require("robotjs");
let firstRobotMove = false;

let locking = false;
let anchor;
let robotPos;
ioHook.on('mousemove', event => {
    if (enabled && !locking) {
        if (anchor) {
            if(firstRobotMove){
                robotPos=event;
                firstRobotMove=false;
            }
            if (event.y > robotPos.y) {
                robot.scrollMouse(0, -2)
            } else if(event.y < robotPos.y){
                robot.scrollMouse(0, 2)
            }
            if (event.x > robotPos.x) {
                robot.keyTap("right")
            } else if(event.x < robotPos.x){
                robot.keyTap("left")
            }
            locking = true;
            robot.moveMouse(anchor.x, anchor.y);
            setTimeout(() => {
                locking = false;
            }, 50);
        }
    }
});

let enabled = false;
//c
ioHook.registerShortcut([42, 58], (keys) => {
    if (enabled) {
        return;
    }
    enabled = true;    
    // console.log('enabled');
    anchor = robot.getMousePos();
    
    firstRobotMove=true;
    robot.moveMouse(anchor.x+1, anchor.y);    
});
ioHook.registerShortcut([1], (keys) => {
    if (!enabled) {
        return;
    }
    enabled = false;
    // console.log('disabled');
});
ioHook.start();
