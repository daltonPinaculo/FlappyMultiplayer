import * as PIXI from 'pixi.js';

export class Assets{

    app: PIXI.Application

    constructor(app:PIXI.Application){
        this.app = app
    }

    async gerarPersonagem():Promise<PIXI.Sprite>{

        const texture = await PIXI.Assets.load('/bird.png');
        const sprite = new PIXI.Sprite(texture)
        return sprite

    }



    async gerarTerreno():Promise<PIXI.Sprite>{

        const texture = await PIXI.Assets.load('/terreno.png');
        const sprite = new PIXI.Sprite(texture)

        return sprite

    }

    async gerarCano():Promise<PIXI.Sprite>{

        const texture = await PIXI.Assets.load('/pipe.png');
        const sprite = new PIXI.Sprite(texture)

        return sprite


    }

    gerarPassaro(){


    }

    gerarTexto(){


    }

    gerarBotao(){


    }
    
}