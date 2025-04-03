<script lang="ts">
	import { io } from "socket.io-client";
	import Button from "../../components/Button.svelte";
	import StartMenu from "../../components/StartMenu.svelte";
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import { onDestroy, onMount } from "svelte";
   
    const socket = new WebSocket("ws://"+PUBLIC_BACKEND_URL+"/upgrade")

    socket.onopen = () => {
        console.log("Sucesso ao entrar")
        socket.send(JSON.stringify({
            tipo:"conectar",
            conteudo:{
                coordenadas: {
                    x:2,
                    y:3
                },
                id:Math.floor(Math.random()*100),
                nome:"Felps"
            }
        }))
    }

    socket.onmessage = (m) => {
        const conteudo = JSON.parse(m.data)
        console.log(conteudo)
    }

    socket.onclose = () => {
        console.log("Sucesso ao fechar")
    }

</script>

