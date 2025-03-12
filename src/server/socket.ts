import { Server } from "socket.io"
import type { ViteDevServer } from "vite"


export const webSocketServer = {
	name: 'webSocketServer',

	configureServer(server: ViteDevServer) {
	
        if (!server.httpServer) return

        //Manter em memoria do servidor a posição dos jogadores, não precisa criar banco, se foda
        let players= {
            "jogador1":{
                x:1,
                y:2
            },
            "jogador2":{
                x:10,
                y:30
            }
        }

        const io = new Server(server.httpServer)

		io.on('connection', (socket) => {

            socket.on('sendMessage', (message) => {
                socket.emit('receiveMessage', `Se foda felipinho: "${message}"`)
            })


            socket.on('updateCoordenadas', (m:any) => {


            })

            socket.on('playerDesconectado', (m:any) => {
                

            })


            socket.on('playerConectado', (m:any) => {
                

            })



        })





	}
}