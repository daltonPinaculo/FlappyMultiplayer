<script lang="ts">
	import { Game } from '$lib/game';
	import { onMount } from 'svelte';

    let game:Game

    function keyUpEvent(e:KeyboardEvent){
        if(e.key==="ArrowUp"){
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

        if(e.key==="ArrowUp"){
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