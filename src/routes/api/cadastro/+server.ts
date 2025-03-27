import { json, type RequestEvent } from '@sveltejs/kit'
import { prisma } from '../../../server/prisma'
import bcrypt from "bcrypt"

export async function POST(event:RequestEvent) {


  const data = await event.request.json() //Espero receber nome do jogador só

  const senhaHash = await bcrypt.hash(data.senha, 10);
  
  try{
    const usuario = await prisma.usuario.create({
        data:{
            nome:data.nome,
            senha: senhaHash,
            pontuacao:0
        },
        select:{
            id:true,
            nome:true
        }
      })
      console.log(usuario)
      return json({
        message:"Usuário cadastrado com sucesso",
        data:usuario,
      })
        
  }
  catch(err){
    console.log(err)
    return json({
        message:"Usuário já cadastrado com esse nome",
        data:null,
      },{status:400})

  }
}
