import { json } from '@sveltejs/kit'
import { prisma } from '../../../server/prisma.js'
import bcrypt from "bcrypt"

export async function POST(event) {

  const data = await event.request.json() //Espero receber nome do jogador só

  const usuario = await prisma.usuario.findUnique({
    where:{
      nome:data.nome
    },
    select:{
      nome:true,
      senha:true,
      id:true,
    }
  })

  console.log(usuario?.id,"aaa")
  if(!usuario){
    return json({
        message:"Usuário não encontrado no sistema"
    }, {status:404})
  }

  if(!await bcrypt.compare(data.senha,usuario.senha)){
    return json({
      message:"Senha incorreta, tente novamente"
    }, {status:401})
  }

  return json({
    message:"Usuário logado com sucesso",
    data:{
        id:usuario.id,
        nome:usuario.nome
    }
  },{status:200})

}
