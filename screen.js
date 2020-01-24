let screen=require("socket.io")(3259)
let Jimp=require("jimp")
let clients={}
screen.of("/client").on("connection",socket=>{
    socket.on("info",(code,w,h)=>{
        socket.width=w;
        socket.height=h
        clients[code]=socket
    screen.of("/sc/"+code).on("connection",remote=>{
        socket.on("sc",(sc)=>{
            new Jimp(
                socket.width,
                socket.height,(err,img)=>{
                img.bitmap.data=sc
                img.write("test.jpg")
                img.getBase64(Jimp.MIME_PNG,(err,buf)=>{
                    require("fs").writeFileSync("test.png",Buffer.from(buf.split("base64,")[1],"base64"))
                    remote.emit("img",buf)
                })
            })
        })
    })
    })

})