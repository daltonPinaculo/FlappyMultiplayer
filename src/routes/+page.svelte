<script lang="ts">
	import { Game } from '$lib/game';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

    let game:Game

    function keyUpEvent(e:KeyboardEvent){
        if(e.key==="ArrowUp" || "Space"){
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

<div class="flex flex-col  items-center justify-center text-amber-50 w-full h-full bg-slate-950">
    <h1 class="text-3xl mb-2">GAME OF THE YEAR 2025</h1>
    <div class="game border-[16px] h-[600px] w-[80%] overflow-hidden rounded-lg border-amber-100">

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