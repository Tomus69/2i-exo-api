import { openModal, closeModal, createArticle } from "../components/Articles.js";

export class Articles {
    createButton() {
        const createButton = document.querySelector("#button-create");
        createButton.addEventListener('click', () => {
            openModal("my-modal");
        });
    }
    closeModalButton() {
        const closeModalCross = document.querySelector("#close-modal");
        closeModalCross.addEventListener('click', () => {
            closeModal("my-modal");
        });
    }
    closeModalButton2() {
        const closeModalCross = document.querySelector("#close-up-modal");
        closeModalCross.addEventListener('click', () => {
            closeModal("update-modal");
        });
    }
    submit() {
        const submitButton = document.querySelector("#submit-button");
        submitButton.addEventListener('click', () => {
            createArticle();
        });
    }
    html() {
        return `
            <div>
                <h1>Articles</h1>
                <div id="articles"></div>
                <a id="button-create" href="#" class="btn btn-primary">Créer</a>
                <div id="my-modal" class="modal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Nouvel Article</h5>
                                <button id="close-modal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <label for="title" class="form-label">Titre</label>
                                    <input type="text" id="title" class="form-control">
                                </div>
                                <div>
                                    <label for="text" class="form-label">Texte</label>
                                    <input type="text" id="text" class="form-control">
                                </div>
                                <div>
                                    <label for="author" class="form-label">Auteur</label>
                                    <input type="text" id="author" class="form-control">
                                </div>
                                <div id="error-message" class="form-text"></div>
                            </div>
                            <div class="modal-footer">
                                <button id="submit-button" type="button" class="btn btn-primary">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="update-modal" class="modal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Modifier l'article</h5>
                                <button id="close-up-modal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <label for="update-title" class="form-label">Titre</label>
                                    <input type="text" id="update-title" class="form-control">
                                </div>
                                <div>
                                    <label for="update-text" class="form-label">Texte</label>
                                    <input type="text" id="update-text" class="form-control">
                                </div>
                                <div>
                                    <label for="update-author" class="form-label">Auteur</label>
                                    <input type="text" id="update-author" class="form-control">
                                </div>
                                <div id="error-message" class="form-text"></div>
                            </div>
                            <div class="modal-footer">
                                <button id="update-submit" type="button" class="btn btn-primary">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
