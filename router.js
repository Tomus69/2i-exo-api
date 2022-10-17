import {Articles} from "./views/Articles.js";
import {Podcasts} from "./views/Podcasts.js";
import {Videos} from "./views/Videos.js";
import {SignUp} from "./views/SignUp.js";

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
        this.contentContainer.innerHTML = (new this.routes.signUp).html()

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
