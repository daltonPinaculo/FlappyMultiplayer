<script lang="ts">
	import { io } from "socket.io-client";

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

<div class="max-w-2xl mx-auto p-4">
    <div class="flex gap-2 mb-4">
        <input 
            type="text" 
            bind:value={value}
            placeholder="Digite sua mensagem..."
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onkeydown={(e) => e.key === 'Enter' && enviarMensagem()}
        >
        <button 
            onclick={enviarMensagem}
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!value.trim()}
        >
            Enviar
        </button>
    </div>

    <div class="space-y-2 mt-10">
        {#each mensagens as m}
            <div class="p-3 bg-gray-100 rounded-lg text-gray-800">
                {m}
            </div>
        {/each}
    </div>
</div>