export default function getArticles() {
    const request = window.indexedDB.open("articles", 1);
    const articlesCard = document.querySelector('#articles');

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
                articles.forEach(element => {
                    const parent = document.createElement("div");
                    parent.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.text}</p>
                                <p class="card-text">${element.author}</p>
                                <a id="button-update" href="#" class="btn btn-primary">Modifer</a>
                                <a id="button-delete" href="#" class="btn btn-primary">Supprimer</a>
                            </div>
                        </div>
                    `;
                    articlesCard.appendChild(parent);
                    const deleteButton = document.querySelector("#button-delete");
                    deleteButton.addEventListener('click', () => {
                        deleteArticle(element.id);
                    });
                });
            }
        }
    }
    request.onerror = (event) => {
        console.log('ERROR :', event);
    }
}

export function deleteArticle(id = 1) {
    const request = window.indexedDB.open("articles", 1);

    request.onsuccess = (event) => {
        console.log('success');
        const db = event.target.result;
    
        const store = db.transaction("articles", "readwrite").objectStore("articles");
        const req = store.delete(id);

        req.onsuccess = () => {
            console.log('DELETE SUCCESS :', id);
            window.location.reload();
        }
        req.onerror = (e) => {
            console.log('DELETE ERROR :', e);
        }
    }
    request.onerror = (e) => {
        console.log('REQUEST ERROR :', e);
    }
}

