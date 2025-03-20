import * as PIXI from 'pixi.js';
import { Assets } from './assets';
import * as Sound from '@pixi/sound';

export class Game{
    
    app: PIXI.Application = new PIXI.Application()

    stageScene:PIXI.IRenderLayer = new PIXI.RenderLayer() //Cenario de fundo
    stagePipes:PIXI.IRenderLayer = new PIXI.RenderLayer() //Os cano
    stagePlayer:PIXI.IRenderLayer = new PIXI.RenderLayer() //Jogador principal
    stageGhostPlayers:PIXI.IRenderLayer = new PIXI.RenderLayer() //Jogadores fantasmas
    stageGUIStart:PIXI.IRenderLayer = new PIXI.RenderLayer() //Colocar texto,botoes,etc
    stageGUIBoard:PIXI.IRenderLayer = new PIXI.RenderLayer() //Colocar texto,botoes,etc
    
    stageScore : PIXI.IRenderLayer = new PIXI.RenderLayer()
    ticker: PIXI.Ticker = new PIXI.Ticker
    player:PIXI.Sprite = new PIXI.Sprite(undefined);
    assetGenerator = new Assets(this.app)
    world: PIXI.Container = new PIXI.Container({
        width:1280,
        height:720
    })


    physics = {
        gravity:0.4,
    }
    
    game = {
        currentTime:0,
        start:false,
        menu:false,
        keyDelay:{
            fly:true
        }
    }

    habilitys = {
        jump: 0,
        isDead:false,
        score:0,
        jumpMax:3,
        vX:2,
        maxVx:4,
        vY:0,
        maxVy:4
    }
    

    constructor(){
        this.init()
    }

    async cenarioInit(){

        this.app.stage.addChild(this.world);
        this.world.addChild(this.player)
        this.stagePlayer.attach(this.player)
        this.world.addChild(this.stagePipes)
        this.world.addChild(this.stageScene)
        this.world.addChild(this.stagePlayer)
        this.world.addChild(this.stageScore)
        this.world.addChild(this.stageGUIBoard)
        this.world.addChild(this.stageGUIStart)
        await this.gerarMenus()
        await this.terrenoParallaxGen()
        await this.pipesGen()

    }

    async gerarMenus(){
        const objetos = this.assetGenerator.gerarMenuInicial()

        this.world.addChild(objetos.fundo)
        this.world.addChild(objetos.botao)
        this.world.addChild(objetos.titulo)
        this.stageGUIStart.attach(objetos.fundo)
        this.stageGUIStart.attach(objetos.botao)
        this.stageGUIStart.attach(objetos.titulo)
        this.mostrarMenuPrincipal()
    
    }

    async esconderMenuPrincipal(){
        this.stageGUIStart.renderLayerChildren.forEach((obj)=>{
            obj.visible=false
        })
    }

    async resetarPlayer(){
        this.player.x = this.app.screen.width/2 - this.player.width/2
        this.player.y = this.app.screen.height/2-200
        this.habilitys.isDead=false
        this.terrenoParallaxGen()
    }

    async resetarCenario(){
        
        while(this.stagePipes.renderLayerChildren[0]) { 
            this.world.removeChild(this.stagePipes.renderLayerChildren[0]); 
        }
        while(this.stageScene.renderLayerChildren[0]) { 
            this.world.removeChild(this.stageScene.renderLayerChildren[0]); 
        }
     
    }

    async mostrarMenuPrincipal(){

        const childrens = this.stageGUIStart.renderLayerChildren
        const bounds = this.world.position
        const btnStart = childrens.find((obj)=>obj.label==="btnStart");
        const fundo = childrens.find((obj)=>obj.label==="fundo");
        const titulo = childrens.find((obj)=>obj.label==="titulo");
        
        
        if(btnStart){
            btnStart.x = this.app.screen.width/2 - childrens[1].width/2 - bounds.x
            btnStart.removeAllListeners()
            btnStart.eventMode = 'static';
            btnStart.cursor = 'pointer';
            btnStart.on("pointerdown",()=>{
                this.esconderMenuPrincipal()
                this.resetarPlayer()
                this.resetarCenario()
                this.game.start=true
            })
    
        }

        if(fundo){
            fundo.x=-bounds.x
        }

        if(titulo){
            titulo.y=150
            titulo.x=  this.app.screen.width/2 - titulo.width/2-bounds.x
        }


        childrens.forEach((obj)=>{
            obj.visible=true
        })

        
    }


    async pipesGen(){

        const totalCanos = 60
        const widthCano = 50

        let canos = this.stagePipes.renderLayerChildren.filter((obj)=>obj.label=="cano")
        const tmp = this.stageScene.renderLayerChildren.find(obj=>obj.label==="terreno")
        let alturaTerreno = tmp ? tmp.height : 0;

        while(canos.length<totalCanos){
            
            const limiteVariacaoSubida = 400
            const ultimoCano = canos[canos.length-1]
            const gap = this.randomIntFromInterval(230,280)
            const variacaoGapCano = this.randomIntFromInterval(180,250)
            const variacaoSubidaCano = this.randomIntFromInterval(80,limiteVariacaoSubida)
            const canoCima = await this.assetGenerator.gerarCano()
            const canoBaixo = await this.assetGenerator.gerarCano()


            const xPos = ultimoCano ? ultimoCano.x + gap :  this.app.screen.width

            canoCima.label='cano'
            canoCima.rotation = 3.141593
            canoCima.y= variacaoSubidaCano
            canoCima.x = xPos


            canoBaixo.label='cano'
            canoBaixo.y= variacaoSubidaCano + variacaoGapCano
            canoBaixo.x = xPos

            const hitbox = new PIXI.Graphics().rect(0,0,widthCano/2,variacaoGapCano+canoCima.height).fill("transparent")
            
            hitbox.x = canoBaixo.x+widthCano/4
            hitbox.y = canoCima.height

            this.world.addChild(hitbox)
            this.stagePipes.attach(hitbox)
        
            this.world.addChild(canoCima)
            this.stagePipes.attach(canoCima)

            this.world.addChild(canoBaixo)
            this.stagePipes.attach(canoBaixo)

            canos = this.stagePipes.renderLayerChildren.filter((obj)=>obj.label==="cano")
        }

        this.stagePipes.renderLayerChildren.map((obj)=>{
            if(obj.label!=="cano" && obj.label!=="scoreBox") return obj
            if(obj.x>(-this.world.x-obj.width)  ) return obj
            this.world.removeChild(obj)
        })

    }

    async terrenoParallaxGen(){
        const totalTiles = 12
        let terrenos = this.stageScene.renderLayerChildren.filter((obj)=>obj.label==="terreno")
        while(terrenos.length<totalTiles){
            const sizeTerreno = this.app.screen.width/5
            const terreno = await this.assetGenerator.gerarTerreno()
            terreno.width= sizeTerreno
            terreno.label='terreno'

            terreno.height =150
            terreno.y=this.app.screen.height-terreno.height
            if(terrenos.length>0){
                const ultimoTile = terrenos[terrenos.length-1]
                if(ultimoTile){
                    terreno.x= ultimoTile.x+ultimoTile.width
                }
            }
            else{
                terreno.x=0
            }
            this.world.addChild(terreno)

            this.stageScene.attach(terreno)

            terrenos = this.stageScene.renderLayerChildren.filter((obj)=>obj.label==="terreno")
        }
        
        this.stageScene.renderLayerChildren.filter((obj)=>{
            if(obj.label!=="terreno") return obj
            if(obj.x>-this.world.x-obj.width) return obj
            this.world.removeChild(obj)
        })

    }

    async init(){
        
        await this.app.init({ background: '#1099bb', width:800, height: 800 });
        
        const canvaDiv = document.querySelector(".game")
        canvaDiv!.appendChild(this.app.canvas);

        Sound.sound.add('flap', '/sons/flap.mp3');
        Sound.sound.add('hit', '/sons/hit.mp3');
        Sound.sound.add('die', '/sons/die.mp3');

        
        this.player = await this.assetGenerator.gerarPersonagem()
        this.resetarPlayer()        
        await this.cenarioInit()

        this.app.ticker.add(async(t) => {        
            this.ticker = t
            await this.gameLoop()
        })    


    }

    async gameLoop(){
     
        this.guiController()
        
        if(!this.habilitys.isDead && this.game.start){
            this.movimento()
            await this.terrenoParallaxGen()
            await this.pipesGen()
            await this.checarColisoes()
        }
        
        if(this.game.start){
            this.puloGravidade()
        }        
    }


    async guiController(){

        if(!this.game.start){
            this.startMenu()
        }
        if(this.game.menu){
            this.scoreMenu()
        }
    }

    async startMenu(){

    }

    async scoreMenu(){

    }


    movimento(){
       
        const limitVx = 4
        const increaseSpeed = 0.00009
        this.game.currentTime+=this.ticker.elapsedMS*increaseSpeed
       
        const velocidade = 2+(this.game.currentTime) > limitVx ? limitVx : 2+(this.game.currentTime)
       
        this.player.x+=velocidade
       
        this.world.x = -(this.player.x - this.app.screen.width/2)


    }

    async checarColisoes(){

        const xP = this.player.getBounds().x
        const yP = this.player.getBounds().y
        const wP = this.player.getBounds().width
        const hP = this.player.getBounds().height

        const allLayers = [...this.stagePipes.renderLayerChildren,...this.stageScene.renderLayerChildren]

        allLayers.forEach((obj)=>{
            const xO = obj.getBounds().x
            const yO = obj.getBounds().y
            const wO = obj.getBounds().width
            const hO = obj.getBounds().height
            
            if (xP + wP > xO &&    // Lado direito do player passa o lado esquerdo do objeto
                xP < xO + wO &&    // Lado esquerdo do player antes do lado direito do objeto
                yP + hP > yO &&    // Base do player passa o topo do objeto
                yP < yO + hO) {    // Topo do player antes da base do objeto
                
                
                if (obj.label === "cano" || obj.label==="terreno") {
                    this.habilitys.isDead=true
                    Sound.sound.play('hit');
                    setTimeout(()=>{

                        Sound.sound.play('die');
                    },500)
                    setTimeout(()=>{
                        this.mostrarMenuPrincipal()
                    },1000)
                }
                
                if(obj.label==="scoreBox"){
                    this.habilitys.score++
                    this.world.removeChild(obj)
                    return
                }

            }

        })
    }


    async puloGravidade(){
        const rotationForce = 0.05;
        const limitRotation = 0.8

        this.habilitys.vY += this.physics.gravity;
        this.habilitys.vY -= this.habilitys.jump;

        this.habilitys.vY = this.habilitys.maxVy<this.habilitys.vY ? this.habilitys.maxVy : this.habilitys.vY
        
        this.habilitys.vY = -this.habilitys.maxVy>this.habilitys.vY ? -this.habilitys.maxVy : this.habilitys.vY
        

        if(this.player.rotation>limitRotation){
            this.player.rotation = limitRotation
        }
        if(this.player.rotation<-limitRotation){
            this.player.rotation = -limitRotation
        }
        
        if(this.habilitys.vY>0){
            this.player.rotation+=rotationForce
        }
        else{
            this.player.rotation-=rotationForce

        }

 
        if(this.habilitys.isDead){
            this.player.y += this.physics.gravity*20;
            return
        }


        if(this.habilitys.jump>0){
            this.habilitys.jump-=this.physics.gravity/2;
            if(this.habilitys.jump<0) this.habilitys.jump=0; 
        }
        this.player.y += this.habilitys.vY;
        

    }

    //Keys
    keyRightActions(){
    }
    
    keyLeftActions(){
    }
    
    keyUpActions(){

    }
    
    keyRightRelease(){
    }
    
    keyLeftRelease(){
    }
    
    keyUpRelease () {
                //Pulo
                if(!this.game.keyDelay.fly || this.habilitys.isDead){
                    return
                }
                this.habilitys.jump=this.habilitys.jumpMax
                Sound.sound.play('flap');
                this.game.keyDelay.fly=false
                setTimeout(()=>{
                    this.game.keyDelay.fly=true
                },180)
    }


    randomIntFromInterval(min:number, max:number) {  
        return Math.random() * (max - min + 1) + min;
    }
      
}

