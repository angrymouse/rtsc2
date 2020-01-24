let robot = require("robotjs");

let args = require("yargs").argv;
let io=require("socket.io-client");
let server=io("http://"+args.h+":3259/client");
let size=robot.getScreenSize()
server.emit("info",args.c,robot.getScreenSize().width,robot.getScreenSize().height)
setInterval(()=>{
    server.emit("sc",robot.screen.capture(0,0,size.width,size.height).image)
},1000)