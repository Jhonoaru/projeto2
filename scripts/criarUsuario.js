document.getElementById("formulario").addEventListener('submit', function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const usuario = {
        id: Date.now(), // Utiliza o timestamp atual como ID único
        nome: nome,
        email: email,
        dataCadastro: new Date().toLocaleString() // Adiciona a data de cadastro
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('formulario').reset();

    alert("Usuário cadastrado com sucesso.");
    atualizarListaUsuarios();
});

function atualizarListaUsuarios() {
    const listaUsuarios = document.getElementById('lista-usuarios');
    listaUsuarios.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `ID: ${usuario.id}, Nome: ${usuario.nome}, E-mail: ${usuario.email}, Data de Cadastro: ${usuario.dataCadastro}`;

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', function() {
            excluirUsuario(usuario.id);
        });

        li.appendChild(botaoExcluir);
        listaUsuarios.appendChild(li);
    });
}

function excluirUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(usuario => usuario.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarListaUsuarios();
}

// Atualiza a lista de usuários quando a página é carregada
document.addEventListener('DOMContentLoaded', atualizarListaUsuarios);
