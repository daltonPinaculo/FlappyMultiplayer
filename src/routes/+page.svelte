<script lang="ts">
	import { Game } from '$lib/game.svelte';
	import { io } from 'socket.io-client';
	import { onDestroy, onMount } from 'svelte';
	import StartMenu from '../components/StartMenu.svelte';
	import infoUser from '$lib/front.svelte';

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

    function desconectar(){
        game.socketConnection.emit("desconectarJogador",{
                id:game.dadosJogador ? game.dadosJogador.id : -1
        })
    }


	onMount(() => {
        game = new Game()
        return () => {
            desconectar()
        }
    });

    onDestroy(()=>{
        desconectar()
    })



</script>

<svelte:document onkeydown={keyDownEvent} onkeyup={keyUpEvent}/>

<div class="flex flex-col  items-center justify-center text-amber-50 w-full h-full bg-slate-950">
    <h1 class="text-3xl mb-2">GAME OF THE YEAR 2025</h1>

    <div class="game border-[16px] h-[600px] w-[80%] overflow-hidden rounded-lg border-amber-100 relative">
        {#if infoUser.info.freezeGame}
            <div class="absolute top-0 left-0 w-full h-full">
                <StartMenu onLogin={(r)=>{
                    game.dadosJogador={
                        id:r.id,
                        nome:r.nome
                    }
                    game.socketConnection.emit("entrarNovoJogador",{
                        nome:game.dadosJogador.nome,
                        id: game.dadosJogador.id
                    })
                }}/>
            </div>
        {/if}
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