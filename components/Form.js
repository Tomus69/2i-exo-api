export default function getForm() {
    const submitForm = document.querySelector('#my-form');
    const name = document.querySelector("#inputName");
    const lastname = document.querySelector("#inputLastname");
    const email = document.querySelector("#inputEmail4");
    const password = document.querySelector("#inputPassword4");
    const address = document.querySelector("#inputAddress");
    const image = document.querySelector("#inputPicture");
    
    submitForm.addEventListener('submit', (e) => {
        const payload = {
            name: name.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            address: address.value,
            image: image.value,
        };
        console.log('SUBMIT :', payload);
    });
}

