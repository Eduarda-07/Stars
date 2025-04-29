//serve para mostrar os erros oculotos no terminal
"use strict"

async function login() {
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
    const response = await fetch(url, options)

    const dataResponse = await response.json()

    
    console.log(dataResponse.user);

    if (response.status == 200) {
        alert('Login realizado com sucesso!')
         // Armazenar no local Storage
    localStorage.setItem("dadosIdLogado", dataResponse.user.id)

        window.location.href = "./perfil.html"

    } else {
        alert('Login ou senha invalida')
        console.log(alert)
    }

}

async function registrar() {
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
    const response = await fetch(url, options)

    if (response.status == 201) {
        alert('Cadastro realizado com sucesso!')
        window.location.href = "./index.html"

    } else {
        alert('Cadastro inválido.')
    }

}

async function recuperacao() {
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
    console.log(newResponse.id);

    // Armazenar no local Storage
    localStorage.setItem("dadosId", newResponse.id)

    if (response.status == 200) {
        alert('Palavra verificada!')

        window.location.href = "./novaSenha.html"

    } else {
        alert('Palavra invalida')
    }

}
async function novaSenha() {
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
    const response = await fetch(url, options)

    if (response.status == 200) {
        alert('Senha atualizada com sucesso!')

        window.location.href = "./index.html"

    } else {
        alert('Não foi possível atualizar a senha')
    }

}

async function perfil() {
    const dadosIDNumber = localStorage.getItem("dadosIdLogado")
    console.log(dadosIDNumber);

    const url = `https://back-spider.vercel.app/user/pesquisarUser/${dadosIDNumber}`
    
    const data = await fetch(url)
    const json1 = await data.json()
    telaPerfil(json1)

}

async function publicacoes() {
    const dadosIDNumber = localStorage.getItem("dadosIdLogado")
    const url = "https://back-spider.vercel.app/publicacoes/listarPublicacoes"
    const data = await fetch(url)
    const json2 = await data.json()

    // const id =  json2.idUsuario == dadosIDNumber
    const publicacoesDoUsuario = json2.filter(pub => pub.idUsuario == dadosIDNumber);
    listarPublicacao(publicacoesDoUsuario)
    console.log(publicacoesDoUsuario, "aqui");
    
}

async function listarPublicacao(publicacoes) {
    const container = document.getElementById('postagens')
    
    if (publicacoes && Array.isArray(publicacoes) && publicacoes.length > 0) {
    
        container.replaceChildren('')

        publicacoes.forEach(publicacao => {
            // const lugar = document.getElementById('lugar')
            // lugar.textContent = publicacoes[0].local
        
            // const foto = document.getElementById('foto')
            // foto.src = publicacoes[0].imagem

            const post = document.createElement('div');
            post.classList.add('post'); // Adiciona uma classe para facilitar a estilização (opcional)

            const topo = document.createElement('div');
            topo.classList.add('topo');


            const lugar = document.createElement('h3');
            lugar.textContent = publicacao.local;

            const foto = document.createElement('div');
            foto.classList.add('foto');

            const fotoElement = document.createElement('img'); 
            fotoElement.src = publicacao.imagem;
          
            const bottom = document.createElement('div');
            bottom.classList.add('bottom');

            const estrela = document.createElement('img'); 
            estrela.src = './imgs/estrela.png';
            estrela.classList.add('curtir')
            bottom.appendChild(estrela)

            const comentarios = document.createElement('img'); 
            comentarios.src = './imgs/comentarios.png'
            comentarios.classList.add('comentar')
            bottom.appendChild(comentarios)

            const enviar = document.createElement('img'); 
            enviar.src = './imgs/enviar.png'
            enviar.classList.add('enviar')
            bottom.appendChild(enviar)

            const salvar = document.createElement('img'); 
            salvar.src = './imgs/savar.png'
            salvar.classList.add('savar')
            bottom.appendChild(salvar)

            
            foto.appendChild(fotoElement)
            topo.appendChild(lugar);
            post.appendChild(topo)
            post.appendChild(foto);
            post.appendChild(bottom);
            container.appendChild(post);
        })
       
       
    } else {
        console.log('erro ao listar publicações')
    }
   

}
async function preencherPublicacoes() {
    // const fotos = await listarPublicacao()
    // fotos.forEach((foto) => listarPublicacao())



    const dadosIDNumber = localStorage.getItem("dadosIdLogado");
    const url = `https://back-spider.vercel.app/publicacoes/listarPublicacoes`;

    try {
        const response = await fetch(url);
        const publicacoes = await response.json();

        const publicacoesDoUsuario = publicacoes.filter(pub => pub.idUsuario === dadosIDNumber);
        listarPublicacao(publicacoesDoUsuario);
        console.log(publicacoesDoUsuario);
        
    } catch (error) {
        console.error('Erro ao obter publicações:', error);
    }
}

async function telaPerfil(json) {
    const nomeH2 = document.getElementById('h2')


    nomeH2.textContent = json.nome

    const fotoDiv  = document.getElementById ('perfil')
    
    const img = document.createElement('img')

    img.src = json.imagemPerfil

    fotoDiv.appendChild(img)

}

// window.onload = perfil;

perfil()

publicacoes()

