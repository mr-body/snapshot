import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://luanda-1688e-default-rtdb.firebaseio.com/",
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, "usuarios");

const nomeInput = document.getElementById("nome");
const localizacaoInput = document.getElementById("localizacao");
const addButtonEl = document.getElementById("add-button");
const searchInput = document.getElementById("search-input");
const listItemsEl = document.getElementById("list-items");

let usuarios = [];
let editingUserKey = null;

onValue(dbRef, (snapshot) => {
  usuarios = [];
  listItemsEl.innerHTML = "";
  snapshot.forEach(user => {
    const userData = { key: user.key, ...user.val() };
    usuarios.push(userData);
    displayUser(userData);
  });
});

function displayUser(userData) {
  const item = document.createElement("li");
  item.textContent = `${userData.nome} - ${userData.localizacao}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.addEventListener("click", () => {
    editingUserKey = userData.key;
    nomeInput.value = userData.nome;
    localizacaoInput.value = userData.localizacao;
    addButtonEl.textContent = "Atualizar";
  });

  item.appendChild(editButton);
  item.addEventListener("dblclick", () => {
    if (confirm("Tem certeza que deseja remover?")) {
      remove(ref(database, "usuarios/" + userData.key));
    }
  });
  listItemsEl.append(item);
}

addButtonEl.addEventListener("click", () => {
  const nome = nomeInput.value;
  const localizacao = localizacaoInput.value;

  if (nome && localizacao) {
    const exists = usuarios.some(user => user.nome === nome && user.localizacao === localizacao && user.key !== editingUserKey);
    if (!exists) {
      if (editingUserKey) {
        updateUser(editingUserKey, nome, localizacao);
        editingUserKey = null; // Resetar após a atualização
        addButtonEl.textContent = "Adicionar";
      } else {
        insertUser(nome, localizacao);
      }
      nomeInput.value = "";
      localizacaoInput.value = "";
    } else {
      alert("Usuário já cadastrado.");
    }
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

function insertUser(nome, localizacao) {
  set(push(dbRef), {
    nome: nome,
    localizacao: localizacao
  });
}

function updateUser(key, nome, localizacao) {
  set(ref(database, `usuarios/${key}`), {
    nome: nome,
    localizacao: localizacao
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  listItemsEl.innerHTML = "";
  usuarios.forEach(user => {
    if (user.nome.toLowerCase().includes(query) || user.localizacao.toLowerCase().includes(query)) {
      displayUser(user);
    }
  });
});









window.addEventListener("load", (e) => {
  registerSW();
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (e) {
      alert("ServiceWorker registration failed. Sorry about that.");
    }
  } else {
    document.querySelector(".alert").removeAttribute("hidden");
  }
}