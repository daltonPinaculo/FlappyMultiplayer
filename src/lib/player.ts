import shortUUID from "short-uuid";
import { Assets } from "./assets"
import * as PIXI from 'pixi.js';

export class Player{

    assetsGen:Assets 

    sprite:PIXI.Sprite | null = new PIXI.Sprite()
    
    world:PIXI.Container = new PIXI.Container({
            width:1280,
            height:720
    })

    player:{
        nome:string,
        id:number
    } | null = null

    constructor(assetsGen:Assets,word:PIXI.Container,layer:PIXI.IRenderLayer,player:{nome:string,id:number}){
        this.player = player
        this.assetsGen = assetsGen
        assetsGen.gerarPersonagem().then(result=>{
            this.sprite=result
            this.world = word
            this.world.addChild(this.sprite)
            layer.attach(this.sprite)
        })
    }

    atualizarMovimento(x:number,y:number,rotacao:number){
        if(this.sprite===null) return
        
        this.sprite.x=x;
        this.sprite.y=y;
        this.sprite.rotation = rotacao
        
    }


    destroy(){
        if(this.sprite)
            this.world.removeChild(this.sprite)
    }



    


}