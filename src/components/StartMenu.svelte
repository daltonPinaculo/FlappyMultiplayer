<script lang="ts">
	import infoUser from "$lib/front.svelte";
	import axios from "axios";


	import Button from "./Button.svelte";
	import ButtonArrow from "./ButtonArrow.svelte";

    let modo = $state<"login" | "cadastro" | "menu">("menu")

    let formCadastro = $state({
        nome:"",
        senha:""
    })

    let formLogin = $state({
        nome:"",
        senha:""
    })

    async function cadastrar(){
        if(formCadastro.nome.length===0){
            return alert("Insira seu nome fiote")
        }
        if(formCadastro.senha.length===0){
            return  alert("Parem de testar o sistema")
        }
        try{
            await axios.post("/api/cadastro",formCadastro)
            modo="menu"
            alert("Pode logar agora")
        }
        catch(err){
            console.log(err)
            alert("Usuário com esse nick já existe")

        }
    }


    async function logar(){
        if(formLogin.nome.length===0){
            return alert("Insira seu nome fiote")
        }
        if(formLogin.senha.length===0){
            return  alert("Parem de testar o sistema")
        }
        try{
            await axios.post("/api/auth",formLogin)
            modo="menu"
            infoUser.info.logado=true
        }
        catch(err){
            alert("Usuario/Senha incorretos")
        }
    }
</script>

<div class="flex flex-col justify-center gap-12 items-center text-white w-full h-full bg-[rgba(0,0,0,.4)]">


    {#if modo!=="menu"}
    <div class="absolute top-[12px] left-0">
        <ButtonArrow  onClick={()=>modo="menu"}/>
    </div>
    {/if}

    <h1 class="text-[62px] font-medium">
        Flappy Multiplayer
    </h1>    
    
    
    <div class="flex flex-col gap-4">
    
        {#if modo==="menu"}
        {#if infoUser.info.logado}

        <Button onClick={()=>            infoUser.info.freezeGame=false}> 
            Play
        </Button>

        {:else}

            <Button onClick={()=>modo="login"}> 
                Logar
            </Button>
            <Button onClick={()=>modo="cadastro"}> 
                Cadastrar
            </Button>

        {/if}
        {:else if modo==="cadastro"}

            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    Usuário
                    <input type="text" class="w-full rounded-[10px] text-gray-900" bind:value={formCadastro.nome} placeholder="Ex: Joãozinho">
                </div>
                <div class="flex flex-col gap-1">
                    Senha
                    <input type="text" class="w-full rounded-[10px]  text-gray-900" bind:value={formCadastro.senha} placeholder="Ex: SenhaMuitoForte123">
                </div>
            </div>

            <div class="flex gap-2 items-center">
                <Button onClick={cadastrar}> 
                    Cadastrar
                </Button>
    
            </div>

        {:else if modo==="login"}

            
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    Usuário
                    <input type="text" class="w-full rounded-[10px] text-gray-900" bind:value={formLogin.nome} placeholder="Ex: Joãozinho">
                </div>
                <div class="flex flex-col gap-1">
                    Senha
                    <input type="text" class="w-full rounded-[10px]  text-gray-900"  bind:value={formLogin.senha} placeholder="Ex: SenhaMuitoForte123">
                </div>
            </div>

            <Button onClick={logar}> 
                Logar
            </Button>


        {/if}

    </div>

</div>