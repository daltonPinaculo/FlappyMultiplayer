import * as PIXI from 'pixi.js';
import { Assets } from './assets';


export class Game{
    
    app: PIXI.Application = new PIXI.Application()
    ticker: PIXI.Ticker = new PIXI.Ticker
    player:PIXI.Sprite = new PIXI.Sprite(undefined);
    assetGenerator = new Assets(this.app)
    
    physics = {
        gravity:4,
    }
    
    habilitys = {
        jump: 0,
        vX:0,
        maxSpeed:4,
        inGround:false
    }
    
    obstacles:{
        x:number,
        y:number,
        width:number,
        height:number
    }[] = []
    
    constructor(){
        this.init()
    }


    async cenarioInit(){
        const size = 150
        this.obstacles.push(this.assetGenerator.gerarCaixa(0,this.app.screen.height-size,this.app.screen.width,size))
    }

    async init(){
        
        await this.app.init({ background: '#1099bb', resizeTo: window });

        document.body.appendChild(this.app.canvas);
        
        const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');
        this.player = new PIXI.Sprite(texture);
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
        this.checarColisoes()
        this.puloGravidade()
        this.aceleracao()
    }

    gerarCenario(){



    }

    checarColisoes = () => {
        let detectarChao=false
        this.obstacles.forEach((obj)=>{
            const topObj = obj.y
            if(topObj<=this.player.y+this.player.height){
                detectarChao=true
            }
        })
        this.habilitys.inGround=detectarChao
    }


    aceleracao = () => {
        const limiteTela = 120
        this.player.x += this.habilitys.vX
        if(this.player.x<=this.app.screen.width/2-limiteTela){
            this.player.x = this.app.screen.width/2-limiteTela
            this.player.x += 0.1*this.ticker.deltaTime

        }
        if(this.player.x>=this.app.screen.width/2+limiteTela){
            this.player.x = this.app.screen.width/2+limiteTela
        }
        if(this.player.x>(this.app.screen.width/2+6)){
            this.player.x -= this.habilitys.maxSpeed/3
        }

        if(this.player.x<(this.app.screen.width/2-6)){
            this.player.x += this.habilitys.maxSpeed/3
        }

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

