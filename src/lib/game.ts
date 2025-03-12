import * as PIXI from 'pixi.js';
import { Assets } from './assets';
import ShortUniqueId from 'short-unique-id';

// Definindo o tipo estendido
type Obstacle = {
    object: PIXI.Sprite
    name: string;
    id: string;
};
const idGen = new ShortUniqueId()
export class Game{
    
    app: PIXI.Application = new PIXI.Application()
    ticker: PIXI.Ticker = new PIXI.Ticker
    player:PIXI.Sprite = new PIXI.Sprite(undefined);
    assetGenerator = new Assets(this.app)
    
    physics = {
        // Usando o tipo no array
        gravity:4,
    }
    
    habilitys = {
        jump: 0,
        vX:0,
        maxSpeed:4,
        inGround:false
    }
    
    objects: Obstacle[] = [];
    
    constructor(){
        this.init()
    }


    async cenarioInit(){
    }

    async terrenoParallaxGen(){
        

        const terreno = await this.assetGenerator.gerarTerreno()
        terreno.width=this.app.screen.width/3
        terreno.height =150
        terreno.y=this.app.screen.height-terreno.height
        this.app.stage.addChild(terreno)
        this.objects.push(
            {
                object: terreno,
                name:"terreno",
                id: idGen.rnd(4)
            }
        )
    }

    async init(){
        
        await this.app.init({ background: '#1099bb', resizeTo: window });

        document.body.appendChild(this.app.canvas);
        
        this.player = await this.assetGenerator.gerarPersonagem()
        await this.cenarioInit()
        this.player.anchor.set(0.5);
        this.app.stage.addChild(this.player);

        this.player.x = this.app.screen.width/2
        this.player.y = 100

        this.app.ticker.add(async(t) => {        
            this.ticker = t
            await this.gameLoop()
        })    
    }

    async gameLoop(){
        this.terrenoParallaxGen()
        this.checarColisoes()
        this.puloGravidade()
    }

    gerarCenario(){



    }

    checarColisoes = () => {
        let detectarChao=false
        this.objects.forEach((obj)=>{
            const topObj = obj.object.y
            if(topObj<=this.player.y+this.player.height){
                detectarChao=true
            }
        })
        this.habilitys.inGround=detectarChao
    }


    puloGravidade = () => {
        const vY = this.habilitys.jump - this.physics.gravity

        if(this.habilitys.jump>0){
            this.habilitys.jump-=this.physics.gravity
            if(this.habilitys.jump<0) this.habilitys.jump=0           
        }
        if(!this.habilitys.inGround || this.habilitys.jump>0)
            this.player.y -= vY;
    }

    //Keys
    keyRightActions(){
       this.habilitys.vX = this.habilitys.maxSpeed
    }
    
    keyLeftActions(){
        this.habilitys.vX = -this.habilitys.maxSpeed
    }
    
    keyUpActions(){
        //Pulo
        if(this.habilitys.inGround)
            this.habilitys.jump=20
    }
    
    keyRightRelease(){
        this.habilitys.vX = 0
    }
    
    keyLeftRelease(){
        this.habilitys.vX = 0
    }
    
    keyUpRelease () {
        this.habilitys.jump=0
    }


}

