import { Server } from "socket.io"
import type { ViteDevServer } from "vite"
import { prisma } from "./prisma"

export const webSocketServer = {
	name: 'webSocketServer',

	configureServer(server: ViteDevServer) {
	
        if (!server.httpServer) return

        let players:{nome:string,id:number}[]= []

        const io = new Server(server.httpServer)

		io.on('connection', (socket) => {

            socket.on('jogadorMoveu', (dados:{x:number,y:number,id:number}) => {
                socket.emit("atualizarCoordenadas",dados)

            })

            socket.on('desconectarJogador', (dados:{id:number}) => {    
                players = players.filter(obj=>obj.id!==dados.id)
            })
            socket.on('atualizarPontuacao', (dados:{id:number,score:number}) => {
                prisma.usuario.update({
                    where:{
                        id:dados.id
                    },
                    data:{
                        pontuacao:dados.score
                    }
                })
            })

            socket.on('entrarNovoJogador', (dados:{nome:string,id:number}) => {
                players.push(dados)
            })



        })





	}
}