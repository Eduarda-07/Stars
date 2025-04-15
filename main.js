//serve para mostrar os erros oculotos no terminal
"use strict"

async function login(){
    const url = `https://back-spider.vercel.app/login`

    const email = document.getElementById('email').value
    const password = document.getElementById('senha').value
    

    const data = {
        email: email,
        senha: password
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url,options)

    console.log(response);

    if(response.status == 200){
        alert('Login realizado com sucesso!')

        window.location.href = "./home.html"
        
    }else{
        alert('Login ou senha invalida')
    }

}

async function registrar(){
    const url = `https://back-spider.vercel.app/user/cadastrarUser`

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const premium = document.getElementById('premium').value
    const imagem = document.getElementById('imagemPerfil').value
    const recuperacao = document.getElementById('senhaRecuperacao').value

    

    const data = {
        nome: nome,
        email: email,
        senha: senha,
        premium: premium,
        imagemPerfil: imagem,
        senhaRecuperacao: recuperacao

    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url,options)

    console.log(response);

    if(response.status == 201){
        alert('Cadastro realizado com sucesso!')
         window.location.href = "./index.html"

    }else{
        alert('Cadastro inválido.')
    }

}

async function recuperacao(){
    const url = `https://back-spider.vercel.app/user/RememberPassword`

    const email = document.getElementById('email').value
    const password = document.getElementById('senha').value
    

    const data = {
        email: email,
        wordKey: password
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    // envia a o conteúdo para url
    const response = await fetch(url, options)

    //pega a resposta da url para poder ver no console 
    const newResponse = await response.json()
    console.log(newResponse);

    // Armazenar no local Storage
    localStorage.setItem("dadosId",newResponse.id)    

    if(response.status == 200){
        alert('Palavra verificada!')

        window.location.href = "./novaSenha.html"
        
    }else{
        alert('Palavra invalida')
    }

}
async function novaSenha(){
    // const dados = await response.json()
   
   const dadosIDNumber = localStorage.getItem("dadosId")

    const url = `https://back-spider.vercel.app/user/newPassword/${dadosIDNumber}`

    const password = document.getElementById('senha').value
    

    const data = {
        senha: password
    }
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url,options)

    if(response.status == 200){
        alert('Senha atualizada com sucesso!')

        window.location.href = "./index.html"
        
    }else{
        alert('Não foi possível atualizar a senha')
    }

}





