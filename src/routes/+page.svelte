<script lang="ts">
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';


    let app: PIXI.Application

    let player:PIXI.Sprite

    function keyDownEvent(e:KeyboardEvent){
            console.log(e.key)
        if(e.key==="ArrowUp"){
            baterAsa()
        }

    
    }

    const gameLoop = async() => {
        // Intialize the application.
        await app.init({ background: '#1099bb', resizeTo: window });

        // Then adding the application's canvas to the DOM body.
        document.body.appendChild(app.canvas);

        const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');
        player = new PIXI.Sprite(texture);

        player.anchor.set(0.5);
        app.stage.addChild(player);

        player.x = app.screen.width/2
        player.y = app.screen.height/2

    }

	onMount(() => {

        app = new PIXI.Application();
        
        gameLoop()

        return ()=>{

            app.destroy()

        }

    });
    function baterAsa() {
        let impulsoFeito = 0
        let maxAngle = 1
        const impulso = 50; // Valor negativo para subir (ajuste conforme necessário)
        const vY = 5
        const rSpeed = 2

        app.ticker.add((ticker) => {
            if(impulso<=impulsoFeito){
                ticker.destroy()
            }
            // Impulso vertical para cima (reduz o Y)

            player.y -= vY*ticker.deltaTime;
            impulsoFeito+=vY*ticker.deltaTime

            // Ajusta a rotação para simular o pássaro "subindo"
            player.rotation -= rSpeed*ticker.deltaTime; // Aproximadamente -30 graus (inclinação para cima)
            if(player.rotation<=-maxAngle){
                player.rotation=-maxAngle
            }
            // (Opcional) Limitar a posição Y para não sair da tela
            if (player.y < 0) {
                player.y = 0; // Evita que o pássaro saia pelo topo
            }

        });


    }



</script>

<svelte:document onkeydown={keyDownEvent}/>