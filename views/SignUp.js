export class SignUp {
    html() {
        return `
        <p>Inscription</p>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputName" class="form-label">Nom</label>
                <input type="name" class="form-control" id="inputName">
            </div>
            <div class="col-md-6">
                <label for="inputLastname" class="form-label">Prénom</label>
                <input type="lastname" class="form-control" id="lastname">
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="exemple@gmail.com">
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="inputPassword4">
            </div>
            <div class="col-10">
                <label for="inputAddress" class="form-label">Photo de profil</label>
                <input type="text" class="form-control" id="inputAddress">
            </div>
            <div class="col-2">
                <button id="start-camera" class="btn btn-primary">Activer WebCam</button>
            </div>
            <div class="col-12">
                <video id="video" width="320" height="240" autoplay></video>
                <button id="click-photo" class="btn btn-primary">Prendre la photo</button>
                <canvas id="canvas" width="320" height="240"></canvas>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Adresse</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1 rue Gerland">
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">Ville</label>
                <input type="text" class="form-control" id="inputCity" placeholder="Lyon">
            </div>
            <div class="col-md-6">
                <label for="inputZip" class="form-label">Code Postal</label>
                <input type="number" class="form-control" id="inputZip" placeholder="69007">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">S'inscrire</button>
            </div>
        </form>
    `
    }
}