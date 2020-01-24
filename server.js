let io=require("socket.io")(3258)

let clients={}
let connectors={}
let coms={}
io.of("/client").on("connection",client=>{
client.emit("ready")
    client.on("code",(code)=>{
       if(process.env.DEBUG){ console.log("Client code:"+code)}
        clients[code]=client
        client.code=code
        coms[code]=null
    })
    client.on("screen",console.log)

})
io.of("/connector").on("connection",connector=>{

    connector.emit("ready")
    connector.on("code",(code)=>{
        if(process.env.DEBUG){ console.log("Connector code:"+code)}
        connectors[code]=connector
        connector.code=code
        if(clients[code]){
            if(process.env.DEBUG){ console.log("Connected to:"+code)}
            coms[code]=connector.code

            connector.on("c",(cc,cargs)=>{
             //   console.log(clients,connector.client)
   // console.log(cc,cargs)
                clients[code].emit("c"+cc,...cargs)
            })
clients[code].on("screen",(scr)=>{connector.emit("screen",scr)})
        }

    })


})