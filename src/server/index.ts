import { Server } from "socket.io"
import type { ViteDevServer } from "vite"
import { prisma } from "./prisma"
import memory from "./memory"

export const webSocketServer = {
	name: 'webSocketServer',

	configureServer(server: ViteDevServer) {
	
        if (!server.httpServer) return

        const io = new Server(server.httpServer)

        io.engine.on("connection_error", (err) => {
            console.log(err.req);      // the request object
            console.log(err.code);     // the error code, for example 1
            console.log(err.message);  // the error message, for example "Session ID unknown"
            console.log(err.context);  // some additional error context
        });
		io.on('connection', (socket) => {

            socket.on('jogadorMoveu', (dados:{x:number,y:number,id:number}) => {
                socket.emit("atualizarCoordenadas",dados)
            })


            socket.on('desconectarJogador', (dados:{id:number}) => {    
                console.log("DESCONECAÇ~SD")
                memory.players = memory.players.filter(obj=>obj.id!==dados.id)
                console.log(memory.players)
            })

            socket.on('atualizarPontuacao', async(dados:{id:number,score:number}) => {
                const usuario = await prisma.usuario.findUnique({where:{
                    id:dados.id
                }})
                if(!usuario) return

                if(usuario.pontuacao<dados.score){
                    const usuarioUpdate = await prisma.usuario.update({
                        where:{
                            id:dados.id
                        },
                        data:{
                            pontuacao:dados.score
                        }
                    })    
                }
            })

            socket.on('entrarNovoJogador', (dados:{nome:string,id:number}) => {
                memory.players = [...memory.players.filter(p => p.id !== dados.id), dados];
                console.log(memory.players)
                socket.emit("listaJogadoresAtualizada",memory.players)
            })
            setInterval(()=>{
                 socket.emit("listaJogadoresAtualizada",memory.players)
            },2500)



        })





	}
}