import * as PIXI from 'pixi.js';

export class Assets{

    app: PIXI.Application

    constructor(app:PIXI.Application){
        this.app = app
    }

    gerarCaixa = (x0:number,y0:number,xS:number,yS:number) => {        
        const graphicsBox = new PIXI.Graphics()
        .rect(x0,y0,xS,yS)
        .fill("black")
        this.app.stage.addChild(graphicsBox)
        return {
            x:graphicsBox.getBounds().x,
            y:graphicsBox.getBounds().y,
            width:xS,
            height:yS
        }
    }

    gerarPersonagem(){

    }

    gerarPassaro(){


    }

    gerarTexto(){


    }

    gerarBotao(){


    }
    
}