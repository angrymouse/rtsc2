let io=require("socket.io-client")
let fs=require("fs")
let server=io("http://localhost:3259/sc/HEICO");
server.once("img",(img)=>{
    console.log(  Buffer.from(img,"base64"))
    fs.writeFileSync("screen.png",Buffer.from(img.split("base64,")[1],"base64"))

})