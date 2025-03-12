import * as PIXI from 'pixi.js';
import { Assets } from './assets';
import ShortUniqueId from 'short-unique-id';

// Definindo o tipo estendido
type Obstacle = {
    object: PIXI.Sprite | PIXI.Graphics
    name: "cano" | "terreno" | "scoreBox";
    id: string;
};
const idGen = new ShortUniqueId()
export class Game{
    
    app: PIXI.Application = new PIXI.Application()
    stageScene:PIXI.IRenderLayer = new PIXI.RenderLayer() //Cenario de fundo
    stagePipes:PIXI.IRenderLayer = new PIXI.RenderLayer() //Os cano
    stagePlayer:PIXI.IRenderLayer = new PIXI.RenderLayer() //Jogador principal
    stageGhostPlayers:PIXI.IRenderLayer = new PIXI.RenderLayer() //Jogadores fantasmas
    stageGUI:PIXI.IRenderLayer = new PIXI.RenderLayer() //Colocar texto,botoes,etc
    ticker: PIXI.Ticker = new PIXI.Ticker
    player:PIXI.Sprite = new PIXI.Sprite(undefined);
    assetGenerator = new Assets(this.app)
    


    physics = {
        gravity:4,
    }
    


    habilitys = {
        jump: 0,
        isDead:false,
        score:0
    }
    
    objects: Obstacle[] = [];
    
    constructor(){
        this.init()
    }


    async cenarioInit(){

        this.app.stage.addChild(this.stagePipes)
        this.app.stage.addChild(this.stageScene)
        this.app.stage.addChild(this.stagePlayer)
   
    }


    async pipesGen(){

        const totalCanos = 60
        const widthCano = 50

        let canos = this.objects.filter((obj)=>obj.name==="cano")
        const tmp = this.objects.find(obj=>obj.name==="terreno")
        let alturaTerreno = tmp ? tmp.object.height : 0;

        while(canos.length<totalCanos){

            const gap = 80
            const variacaoGapCano = Math.random()*140+100

            const canoCima = await this.assetGenerator.gerarCano()
            const canoBaixo = await this.assetGenerator.gerarCano()
            
           
            canoCima.width= widthCano
            canoCima.rotation = 3.141593
            canoCima.height = this.app.screen.height/2-variacaoGapCano
            canoCima.y= canoCima.height
            canoCima.x = this.app.screen.width + (gap*canos.length)

            canoBaixo.width= widthCano
            canoBaixo.rotation = 6.283185
            canoBaixo.height = this.app.screen.height/2-variacaoGapCano

            canoBaixo.y= this.app.screen.height-alturaTerreno-canoBaixo.height+20
            canoBaixo.x = this.app.screen.width + (gap*canos.length) - canoCima.width

            const hitbox = new PIXI.Graphics().rect(0,0,widthCano/2,variacaoGapCano+canoCima.height).fill("transparent")
            
            hitbox.x = canoBaixo.x+widthCano/4
            hitbox.y = canoCima.height

            this.app.stage.addChild(hitbox)
            this.stagePipes.attach(hitbox)
        
            this.app.stage.addChild(canoCima)
            this.stagePipes.attach(canoCima)

            this.app.stage.addChild(canoBaixo)
            this.stagePipes.attach(canoBaixo)
        
            this.objects = [
                ...this.objects,
                {
                    object: canoBaixo,
                    name:"cano",
                    id: idGen.rnd(4)
                },
                {
                    object: canoCima,
                    name:"cano",
                    id: idGen.rnd(4)
                },

                {
                    object: hitbox,
                    name:"scoreBox",
                    id: idGen.rnd(4)
                }
            ]

            canos = this.objects.filter((obj)=>obj.name==="cano")
        }
        
        this.objects = this.objects.filter((obj)=>{
            if(obj.name!=="cano" && obj.name!=="scoreBox") return obj
            if(obj.object.x>-obj.object.width) return obj
            this.app.stage.removeChild(obj.object)
        })

        this.objects = this.objects.map((obj)=>{
            if(obj.name!=="cano" && obj.name!=="scoreBox") return obj
            obj.object.x-=2
            return obj
        })

    }

    async terrenoParallaxGen(){

        
        const totalTiles = 8
        let terrenos = this.objects.filter((obj)=>obj.name==="terreno")
        while(terrenos.length<totalTiles){
            const sizeTerreno = this.app.screen.width/5
            const terreno = await this.assetGenerator.gerarTerreno()
            terreno.width= sizeTerreno
            terreno.height =150
            terreno.y=this.app.screen.height-terreno.height
            if(terrenos.length>0){
                const ultimoTile = terrenos[terrenos.length-1]
                if(ultimoTile){
                    terreno.x= ultimoTile.object.x+ultimoTile.object.width
                }
            }
            else{
                terreno.x=0
            }
            this.app.stage.addChild(terreno)

            this.stageScene.attach(terreno)

            this.objects.push(
                {
                    object: terreno,
                    name:"terreno",
                    id: idGen.rnd(4)
                }
            )
            terrenos = this.objects.filter((obj)=>obj.name==="terreno")
        }
        
        this.objects = this.objects.filter((obj)=>{
            if(obj.name!=="terreno") return obj
            if(obj.object.x>-obj.object.width) return obj
            this.app.stage.removeChild(obj.object)
        })

        this.objects = this.objects.map((obj)=>{
            if(obj.name!=="terreno") return obj
            obj.object.x-=3
            return obj
        })

    }

    async init(){
        
        await this.app.init({ background: '#1099bb', resizeTo: window });
        
        document.body.appendChild(this.app.canvas);
        
        this.player = await this.assetGenerator.gerarPersonagem()

        this.player.anchor.set(0.5);
        this.player.x = this.app.screen.width/2
        this.player.y = 100
        this.app.stage.addChild(this.player);
        this.stagePlayer.attach(this.player)

        
        await this.cenarioInit()

        this.app.ticker.add(async(t) => {        
            this.ticker = t
            await this.gameLoop()
        })    
    }

    async gameLoop(){
        await this.terrenoParallaxGen()
        await this.pipesGen()
        await this.checarColisoes()
        await this.puloGravidade()
    }

    gerarCenario(){



    }

    async checarColisoes(){

        const xP = this.player.x
        const yP = this.player.y
        const wP = this.player.width
        const hP = this.player.height

        this.objects.forEach((obj)=>{
            const xO = obj.object.getBounds().x
            const yO = obj.object.getBounds().y
            const wO = obj.object.getBounds().width
            const hO = obj.object.getBounds().height

            if (xP + wP > xO &&    // Lado direito do player passa o lado esquerdo do objeto
                xP < xO + wO &&    // Lado esquerdo do player antes do lado direito do objeto
                yP + hP > yO &&    // Base do player passa o topo do objeto
                yP < yO + hO) {    // Topo do player antes da base do objeto
                
                if (obj.name === "cano") {
                    this.habilitys.isDead=true
                }
                if(obj.name==="scoreBox"){
                    this.habilitys.score++
                    this.app.stage.removeChild(obj.object)
                    this.objects = this.objects.filter((obj2)=>obj2.id!==obj.id)
                    return
                }
            }

        })
    }


    async puloGravidade(){
        const vY = this.habilitys.jump - this.physics.gravity

        if(this.habilitys.jump>0){
            this.habilitys.jump-=this.physics.gravity
            if(this.habilitys.jump<0) this.habilitys.jump=0           
        }
            this.player.y -= vY;
    }

    //Keys
    keyRightActions(){
    }
    
    keyLeftActions(){
    }
    
    keyUpActions(){
        //Pulo
        this.habilitys.jump=20
    }
    
    keyRightRelease(){
    }
    
    keyLeftRelease(){
    }
    
    keyUpRelease () {
        this.habilitys.jump=0
    }


}

