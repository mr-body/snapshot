import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://clientes-36d2f-default-rtdb.firebaseio.com/",
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, "movies");

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listItemsEl = document.getElementById("list-items")

onValue(dbRef, (snapshot) => {
    listItemsEl.innerHTML = ""
    snapshot.forEach(movie => {
        const item = document.createElement("li")
        item.textContent = movie.val()

        item.addEventListener("dblclick", () => {
            if (confirm("Are you sure?")) {
                remove(ref(database, "movies/" + movie.key))
            }
        })
        listItemsEl.append(item)
    })
})

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    set(push(dbRef), inputValue)
    inputFieldEl.value = ""
})


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Evitar que o prompt seja mostrado imediatamente
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar o botão de instalação
    const installButton = document.createElement('button');
    installButton.textContent = 'Instalar App';
    document.body.appendChild(installButton);

    installButton.addEventListener('click', () => {
        // Mostrar o prompt de instalação
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou instalar o app');
            } else {
                console.log('Usuário recusou instalar o app');
            }
            deferredPrompt = null;
        });
    });
});