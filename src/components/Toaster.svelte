<script lang="ts">
    import { fade, fly, scale } from "svelte/transition";
    import { quadInOut } from "svelte/easing";
    import {flySlide} from "$lib/utils/anim/transitions"
    import toast from "$lib/utils/toast.svelte"
    import SvgX from "$components/svg/SvgX.svelte";
    import SvgAlerta from "$components/svg/SvgAlerta.svelte";
    import SvgAlertaTriangulo from "$components/svg/SvgAlertaTriangulo.svelte";
    import SvgCheck from "$components/svg/SvgCheck.svelte";

    const getColor = (status:string) => {
      if(toast.tema==="standard"){
        return "bg-white-0"
      }
      if(status==="neutral"){
        return "bg-information-base"
      }
      if(status==="error"){
        return "bg-error-base"
      }
      if(status==="alert"){
        return "bg-warning-base"
      }
      if(status==="success"){
        return "bg-success-base"
      }
    }




</script>


<div class="fixed pointer-events-none z-50  overflow-hidden top-0 left-0 w-screen
    h-svh p-3 xl:p-12 flex flex-col justify-end items-start">
    {#each toast.toasts as t,i (t.id)}
    {@const easing = quadInOut}
    {@const tamanho = 20}
        <div class="flex flex-row flex-shrink-0 items-center gap-3 mb-2 text-body-lg font-semibold
        text-static-white px-4  py-4 rounded-[12px]  relative shadow-xl 
        {getColor(t.status)} overflow-hidden"
        in:flySlide={{ y: 20, duration: 800,easing }}
        out:flySlide={{ x: 1600, duration: 800,easing }}>


          <div class="flex h-full items-start">
            {@render iconToast(tamanho,t)}          
          </div>

          <div class="flex flex-col max-w-[250px] gap-1 overflow-hidden">
            <h2 class="text-[14px] leading-4 {toast.tema==="standard" && "text-strong-950"} font-semibold">{@html t.titulo}</h2>
            <p class="text-[14px] font-normal {toast.tema==="standard" && "text-sub-600"} leading-4.5 break-words">
              {@html t.conteudo}
            </p> 
          </div>
          
          <div class="flex h-full items-start justify-start pointer-events-auto relative flex-shrink-0">
             <button class="flex-grow-0 mt-1 pointer-events-auto" onclick={()=>toast.remove(t.id)}>
              <SvgX props={{width:11,class:`${toast.tema==="standard" ? " fill-black dark:fill-white" :  "fill-white"}`}}/>
            </button>
          </div>

          <div class="w-full origin-left progress-animation absolute h-1 
          {toast.tema==="standard" ? "bg-static-black dark:bg-static-white" : "bg-static-white" }           
           bottom-0 left-0"
          style="animation-duration:{t.duracao}ms">
          </div>
        
        </div>
     {/each}
</div>

<!-- 
  Usamos snippet para separar renderezicao no arquivo, deixa mais bonito e facil de visualizar o que fazemos
!-->

{#snippet iconToast(tamanho:number,t:typeof toast.toasts[0])}

  {#if t.status==="neutral"}
    <SvgAlerta props={{width:tamanho,height:tamanho,class:`${toast.tema==="standard" ? "" :  "fill-white"}`}}/>
  {:else if t.status==="success"}
    <SvgCheck props={{width:tamanho,height:tamanho,class:`${toast.tema==="standard" ? "" : "fill-white"}`}}/>
  {:else if t.status==="alert"}
    <SvgAlertaTriangulo props={{width:tamanho,height:tamanho,class:`${toast.tema==="standard" ? "" : "fill-white"}`}}/>
   {:else if t.status==="error"}  
     <SvgAlerta props={{width:tamanho,height:tamanho,class:`${toast.tema==="standard" ? "fill-error-base" :  "fill-white"}`}}/>
    
  {/if} 
{/snippet}


<style>  
  .progress-animation{
    animation: progresso linear normal forwards;
  }  

  @keyframes progresso{
    0%{
      transform: scaleX(1);
    }
    100%{
      transform: scaleX(0);
    }
  }
</style>
