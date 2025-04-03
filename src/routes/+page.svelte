<script lang="ts">
	import { Game } from '$lib/game.svelte';
	import { io } from 'socket.io-client';
	import { onDestroy, onMount } from 'svelte';
	import StartMenu from '../components/StartMenu.svelte';
	import infoUser from '$lib/front.svelte';
	import Board from '$components/Board.svelte';

    let game:Game

    function keyUpEvent(e:KeyboardEvent){
        if(e.key==="ArrowUp" || e.key===" "){
            game.keyUpRelease()
        }
        if(e.key==="ArrowLeft"){
            game.keyLeftRelease()
        }
        if(e.key==="ArrowRight"){
            game.keyRightRelease()
        }

    }

    function keyDownEvent(e:KeyboardEvent){


        if(e.key==="ArrowUp" ){
            game.keyUpActions()
        }
        if(e.key==="ArrowLeft"){
            game.keyLeftActions()
        }
        if(e.key==="ArrowRight"){
            game.keyRightActions()
        }

    }

	onMount(() => {
        game = new Game()
    });

</script>

<svelte:document onkeydown={keyDownEvent} onkeyup={keyUpEvent}/>

<div class="flex  items-center justify-center text-amber-50 w-full h-full bg-slate-950">

    <div class="flex flex-col items-center">
        <div class="game border-[16px] h-[600px] w-full overflow-hidden rounded-lg border-amber-100 relative">
            {#if infoUser.info.freezeGame}
                <div class="absolute top-0 left-0 w-full h-full">
                    <StartMenu onLogin={(r)=>{
                        game.dadosJogador={
                            id:r.id,
                            nome:r.nome
                        }
                        game.socketConnection.send(JSON.stringify({
                            tipo:"conectar",
                            conteudo:{
                                nome:game.dadosJogador.nome,
                                id: game.dadosJogador.id,
                                coordenadas:{
                                    x:0,
                                    y:0
                                }
                            }
                        }))
                    }}/>
                </div>
            {/if}
        </div>
    
    </div>
    <div class="absolute right-0">
        <Board/>

    </div>
    
</div>

<style>
    :global(body){
        display: flex;
        flex-direction: column;
        margin: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
</style>