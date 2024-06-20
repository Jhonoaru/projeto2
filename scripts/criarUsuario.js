document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const usuario = {
      id: Date.now(), // Utiliza o timestamp atual como ID único
      nome: nome,
      email: email,
      dataCadastro: new Date().toLocaleString(), // Adiciona a data de cadastro
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso.");
    atualizarListaUsuarios();
  });

document.getElementById("limpar-campos").addEventListener("click", function () {
  document.getElementById("formulario").reset();
});

function atualizarListaUsuarios() {
  const listaUsuarios = document.getElementById("lista-usuarios");
  listaUsuarios.innerHTML = "";

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${usuario.id}, Nome: ${usuario.nome}, E-mail: ${usuario.email}, Data de Cadastro: ${usuario.dataCadastro}`;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
      excluirUsuario(usuario.id);
    });

    li.appendChild(botaoExcluir);
    listaUsuarios.appendChild(li);
  });
}

function excluirUsuario(id) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios = usuarios.filter((usuario) => usuario.id !== id);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  atualizarListaUsuarios();
}

function excluirTodosUsuarios() {
  localStorage.removeItem("usuarios");
  atualizarListaUsuarios();
}

document
  .getElementById("mostrar-usuario")
  .addEventListener("click", function () {
    const listaUsuariosDiv = document.querySelector(".listaUsuario");
    if (
      listaUsuariosDiv.style.display === "none" ||
      listaUsuariosDiv.style.display === ""
    ) {
      listaUsuariosDiv.style.display = "block";
    } else {
      listaUsuariosDiv.style.display = "none";
    }
  });

document
  .getElementById("mostrar-pesquisa")
  .addEventListener("click", function () {
    const campoPesquisa = document.getElementById("campo-pesquisa");
    if (
      campoPesquisa.style.display === "none" ||
      campoPesquisa.style.display === ""
    ) {
      campoPesquisa.style.display = "block";
    } else {
      campoPesquisa.style.display = "none";
    }
  });

document
  .getElementById("botao-pesquisar")
  .addEventListener("click", function () {
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email.toLowerCase().includes(pesquisa) ||
        usuario.id.toString().includes(pesquisa)
    );

    const resultadoPesquisa = document.getElementById("resultado-pesquisa");
    const usuarioEncontradoElemento =
      document.getElementById("usuario-encontrado");
    if (usuarioEncontrado) {
      usuarioEncontradoElemento.textContent = `ID: ${usuarioEncontrado.id}, Nome: ${usuarioEncontrado.nome}, E-mail: ${usuarioEncontrado.email}, Data de Cadastro: ${usuarioEncontrado.dataCadastro}`;
    } else {
      usuarioEncontradoElemento.textContent = "Usuário não encontrado";
    }
    resultadoPesquisa.style.display = "block";
  });

document
  .getElementById("excluir-todos")
  .addEventListener("click", excluirTodosUsuarios);

// Atualiza a lista de usuários quando a página é carregada
document.addEventListener("DOMContentLoaded", atualizarListaUsuarios);
