<script lang="ts">
	import { io } from "socket.io-client";
	import Button from "../../components/Button.svelte";
	import StartMenu from "../../components/StartMenu.svelte";

    let value = $state("")
    let mensagens = $state<string[]>([])
    const socket = io()

    socket.on('receiveMessage', (message:string) => {
        mensagens.push(message)
    })

    function enviarMensagem() {

        socket.emit('sendMessage', value)
        value = ""

    }
    
</script>


<div class="w-screen h-screen grid grid-cols-2">
    <StartMenu/>
    <div class="flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,.1)]">

        <h1 class="text-[40px] font-medium">
            Cadastro
        </h1>    
    
        <input type="text">
    
    </div>
</div>
