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

        window.location.href = "./index2.html"
    }else{
        alert('Login ou senha invalida')

    }

}
