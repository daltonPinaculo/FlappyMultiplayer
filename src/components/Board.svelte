<script lang="ts">
	import { PUBLIC_BACKEND_COMPLETE_URL } from "$env/static/public";
	import axios from "axios";
	import { onMount } from "svelte";
	import { flip } from "svelte/animate";


    let scores = $state<{id:number,nome:string,pontuacao:number}[]>([])

    async function listar(){
        try{
            const response = await axios.get(PUBLIC_BACKEND_COMPLETE_URL+"/scoreboard");
            scores = response.data.data
        }
        catch(err){
            
        }
    }

    let idInterval:NodeJS.Timeout
    onMount(()=>{
        listar()
        idInterval = setInterval(()=>{
            listar()
        },3000)
        return()=>{
            clearInterval(idInterval)
        }
    })

</script>


<div class="container mx-auto p-4 w-[500px]">
    <div class="bg-yellow-100 rounded-3xl p-6 shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-4 border-yellow-300">
        <h1 class="text-4xl font-bold text-center mb-6 text-purple-600 font-comic 
                   tracking-wider drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
            Leaderboard
        </h1>

        <div class="space-y-4">
            {#each scores as score,index (score.id)}
                <div class="flex items-center bg-white rounded-2xl p-4 border-4 
                           border-purple-200 transform hover:scale-105 transition-transform 
                           duration-200 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" animate:flip>
                    <span class="w-12 h-12 flex items-center justify-center text-2xl 
                               font-bold rounded-full mr-4 shrink-0
                               {index === 0 ? 'bg-yellow-400 text-white border-2 border-yellow-600' : 
                               index === 1 ? 'bg-gray-300 text-white border-2 border-gray-500' : 
                               index === 2 ? 'bg-orange-300 text-white border-2 border-orange-500' : 
                               'bg-blue-200 text-blue-800 border-2 border-blue-400'}">
                        #{index + 1}
                    </span>
                    <div class="flex-1">
                        <p class="text-xl font-comic text-purple-700 font-semibold 
                                 drop-shadow-[1px_1px_0px_rgba(255,255,255,1)]">
                            {score.nome}
                        </p>
                    </div>
                    <span class="text-2xl font-bold text-green-600 font-comic 
                               bg-green-100 px-4 py-2 rounded-xl border-2 border-green-300">
                        {score.pontuacao}
                    </span>
                </div>
            {/each}
        </div>
    </div>
</div>