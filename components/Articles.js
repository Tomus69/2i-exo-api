export default function getArticles() {
    const request = window.indexedDB.open("articles", 1);
    const articlesCard = document.querySelector('#articles');
    articlesCard.innerHTML = "";

    request.onsuccess = (event) => {
        const articles = [];
        const db = event.target.result;
        const store = db.transaction("articles", "readonly").objectStore("articles");

        store.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;

            if (cursor) {
                articles.push(cursor.value);
                cursor.continue();
            } else {
                if (articles.length < 1) {
                    const parent = document.createElement("div");
                    parent.innerHTML = `<h5>Aucun article</h5>`;
                    articlesCard.appendChild(parent);
                }
                articles.forEach((element) => {
                    const parent = document.createElement("div");
                    parent.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.text}</p>
                                <p class="card-text">${element.author}</p>
                                <a id="button-update${element.id}" href="#" class="btn btn-primary">Modifer</a>
                                <a id="button-delete${element.id}" href="#" class="btn btn-primary">Supprimer</a>
                            </div>
                        </div>
                    `;
                    articlesCard.appendChild(parent);
                    const deleteButton = document.querySelector(`#button-delete${element.id}`);
                    const updateButton = document.querySelector(`#button-update${element.id}`);
                    deleteButton.addEventListener('click', () => {
                        deleteArticle(element.id);
                    });
                    updateButton.addEventListener('click', () => {
                        updateArticle(element.id);
                    });
                });
            }
        }
    }
    request.onerror = (event) => {
        console.log('ERROR :', event);
    }
}

export function openModal(modal) {
    const modale = document.querySelector(`#${modal}`);
    modale.style.display = "block";
}

export function closeModal(modal) {
    const modale = document.querySelector(`#${modal}`);
    modale.style.display = "none";
}

export function createArticle() {
    const title = document.querySelector('#title');
    const text = document.querySelector('#text');
    const author = document.querySelector('#author');
    const request = window.indexedDB.open("articles", 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const store = db.transaction(["articles"], "readwrite").objectStore("articles");

        const req = store.add({
            title: title.value,
            text: text.value,
            author: author.value
        });

        req.onsuccess = () => {
            title.value = "";
            text.value = "";
            author.value = "";
            closeModal("my-modal");
            getArticles();
            notify('SUCCESS', 'Article créé avec succès !');
        }
        req.onerror = (e) => {
            alert("CREATE ERROR");
            console.error('CREATE ERROR :', e.error);
        }
    }
    request.onerror = (e) => {
        console.error('REQUEST ERROR :', e.error);
    }
}

export const updateArticle = (id) => {
    let currentId = id;
    const title = document.querySelector('#update-title');
    const text = document.querySelector('#update-text');
    const author = document.querySelector('#update-author');
    const submit = document.querySelector('#update-submit');

    const request = window.indexedDB.open("articles", 1);

    openModal("update-modal");

    request.onsuccess = (event) => {
        const db = event.target.result;
        const store = db.transaction(["articles"], "readwrite").objectStore("articles");
        const currentArticle = store.get(currentId);
        
        currentArticle.onsuccess = () => {
            title.value = currentArticle.result.title;
            text.value =  currentArticle.result.text;
            author.value =  currentArticle.result.author;
            currentId = currentArticle.result.id;
        }
    }
    request.onerror = (e) => {
        console.error('REQUEST ERROR :', e.error);
    }

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const title = document.querySelector('#update-title');
        const text = document.querySelector('#update-text');
        const author = document.querySelector('#update-author');

        const request = window.indexedDB.open("articles", 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const store = db.transaction(["articles"], "readwrite").objectStore("articles");

            const req = store.put({
                id: currentId,
                title: title.value,
                text: text.value,
                author: author.value
            });
    
            req.onsuccess = (e) => {
                console.log('UPDATE SUCCESS :', e);
                title.value = "";
                text.value = "";
                author.value = "";
                closeModal("update-modal");
                getArticles();
            }
            req.onerror = (e) => {
                alert("UPDATE ERROR");
                console.error('UPDATE ERROR :', e.error);
            }
        }
        request.onerror = (e) => {
            console.error('REQUEST ERROR :', e.error);
        }
    })
}

export function deleteArticle(id) {
    const request = window.indexedDB.open("articles", 1);

    request.onsuccess = (event) => {
        console.log('success');
        const db = event.target.result;
    
        const store = db.transaction("articles", "readwrite").objectStore("articles");
        const req = store.delete(id);

        req.onsuccess = (e) => {
            console.log('DELETE SUCCESS :', id, e);
            getArticles();
        }
        req.onerror = (e) => {
            alert("DELETE ERROR");
            console.error('DELETE ERROR :', e.error);
        }
    }
    request.onerror = (e) => {
        console.error('REQUEST ERROR :', e.error);
    }
}

function notify(content, body) {
    if (!('Notification' in window)) {
        alert('Ce navigateur ne prend pas en charge la notification de bureau')
    } else if (Notification.permission === 'granted') {
        new Notification(content, { body });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(content, { body });
            }
        })
    }
}