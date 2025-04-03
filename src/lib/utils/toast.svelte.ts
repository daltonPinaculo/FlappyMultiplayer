
import ShortUniqueId from "short-unique-id";

type Status = "neutral" | "success" | "error" | "alert"
type Propriedades = {
    duracao?:number,
    status?:Status
}
type Toast = {
    id:string,
    duracao:number,
    titulo:string,
    conteudo:string,
    status:Status  
}
class ToastManager{

    toasts = $state<Toast[]>([])

    tema = $state<"colorful" | "standard">("standard")
    
    uuid = new ShortUniqueId({length:20});
    
    success(titulo:string,conteudo:string,propriedades?:Propriedades){
        this.push(titulo,conteudo,{
            ...propriedades,
            status:"success",
        })
    }

    error(titulo:string,conteudo:string,propriedades?:Propriedades){
        this.push(titulo,conteudo,{
            ...propriedades,
            status:"error",
        })
    }

    alert(titulo:string,conteudo:string,propriedades?:Propriedades){
        this.push(titulo,conteudo,{
            ...propriedades,
            status:"alert",
        })
    }

    push(titulo:string,conteudo:string,propriedades?:Propriedades){
        const id = this.uuid.rnd();

        if(!propriedades)
            propriedades = {};

        const props = { 
            status: propriedades.status ?? "neutral",
            duracao: propriedades.duracao ?? 6000
        }
        this.toasts.push({
            titulo,
            conteudo:conteudo,
            id:id,
            duracao:props.duracao,
            status:props.status
        })

        setTimeout(()=>{
            this.remove(id)
        },props.duracao)
    }
    
    remove(id:string){
        this.toasts = this.toasts.filter(item => item.id !== id);
    }

    changeTheme(){
        if(this.tema==="colorful")
            return this.tema = "standard"
        if(this.tema==="standard")
            return this.tema = "colorful"
    }

}


const toast = new ToastManager()
export default toast