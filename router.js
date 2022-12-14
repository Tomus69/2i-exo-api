import {Articles} from "./views/Articles.js";
import {Podcasts} from "./views/Podcasts.js";
import {Videos} from "./views/Videos.js";
import {SignUp} from "./views/SignUp.js";
import getArticles from "./components/Articles.js";
import getWebCam from "./components/WebCam.js";
import getAddress from "./components/SearchAddress.js";
import getForm from "./components/Form.js";

export class Router {
    routes;
    menus;
    contentContainer;

    constructor(menus, contentContainer) {
        this.routes = {
            'articles': Articles,
            'podcasts': Podcasts,
            'videos': Videos,
            'signUp': SignUp
        }
        this.menus = menus
        this.contentContainer = contentContainer;
    }

    start() {
        // affichage d'une page par défaut
        this.contentContainer.innerHTML = `<h1>Accueil</h1>`;

        // Ecoute l'événement du click sur les menus et affiche la page correspondante
        this.menus.forEach((menu) => {
            menu.addEventListener('click', (event) => {
                this.empty(this.contentContainer)
                this.goToLink(event.target)
            })
        })
    }

    goToLink(menu) {
        switch (menu.innerText) {
            case 'Articles':
                const articles = new this.routes.articles
                this.display(articles.html())
                const request = window.indexedDB.open("articles", 1)
                request.onsuccess = () => {}
                request.onupgradeneeded = function(event) {
                    const db = event.target.result;
                    const articles = [
                        {
                            id: 1,
                            title: "Mon premier article",
                            text: "Ceci est le corps de l'article",
                            author: "Robert"
                        }
                    ]

                    // Crée un objet de stockage pour cette base de données
                    // Possibilité de générer les id avec l'option autoIncrement
                    const objectStore = db.createObjectStore("articles", { keyPath: "id", autoIncrement: true });

                    //Créer un index pour rechercher les articles par auteur
                    objectStore.createIndex("authorIndex", "author", { unique: false });

                    //Créer un index pour rechercher les articles par titre (le titre doit être unique)
                    objectStore.createIndex("titleIndex", "title", { unique: true });

                    // S'assurer que l'objet de stockage a fini de se créer avant de continuer
                    objectStore.transaction.oncomplete = function(event) {
                        // Stocker les valeurs dans le nouvel objet de stockage.
                        const transaction = db.transaction(["articles"], "readwrite")
                        const articleObjectStore = transaction.objectStore("articles");
                        for (let i in articles) {
                            articleObjectStore.add(articles[i]);
                        }
                        transaction.oncomplete = (event) => {
                            alert("All done!");
                        }
                    }
                };
                request.onerror = (e) => {
                    console.error('error:', e.error)
                }
                articles.createButton();
                articles.closeModalButton();
                articles.closeModalButton2();
                articles.submit();
                getArticles();
                break;
            case 'Podcasts':
                const podcasts = new this.routes.podcasts
                this.display(podcasts.html())
                break
            case 'Vidéos':
                const videos = new this.routes.videos
                this.display(videos.html())
                break
            case "S'inscrire":
                const signUp = new this.routes.signUp
                this.display(signUp.html())
                getWebCam();
                getAddress();
                getForm();
                break
        }
    }

    empty(component) {
        component.innerHTML = ""
    }

    display(html) {
        this.contentContainer.innerHTML = html
    }
}
