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
                <label for="inputPicture" class="form-label">Photo de profil</label>
                <input type="file" class="form-control" id="inputPicture" accept="image/jpeg, image/png, image/jpg">
            </div>
            <div class="col-2">
                <button id="start-camera" class="btn btn-primary">Activer WebCam</button>
            </div>
            <div class="col-12">
                <video id="video" width="320" height="240" autoplay></video>
                <button id="click-photo" class="btn btn-primary">Prendre la photo</button>
                <canvas id="canvas" width="320" height="240"></canvas>
            </div>
            <div class="col-12">
                <div id="display-image" style="width:400px;height:225px;border:1px solid black;background-position:center;background-size: cover;"></div>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Adresse</label>
                <input class="form-control" list="datalistOptions" id="inputAddress" placeholder="1 rue Gerland">
                <datalist id="datalistOptions"></datalist>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">S'inscrire</button>
            </div>
        </form>
    `
    }
}