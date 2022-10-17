const address = document.querySelector("#inputAddress");
const list = document.querySelector("#datalistOptions");

address.addEventListener('input', (e) => {
    e.preventDefault();
    if (e.currentTarget.value.length < 4) return;
    list.innerHTML = '';
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${e.currentTarget.value}&limit=5`)
        .then((res) => {
            res.json().then((r) => {
                r.features.forEach((f) => {
                    console.log(f.properties.label);
                    const op = document.createElement("option");
                    op.setAttribute("value", f.properties.label);
                    op.innerHTML = f.properties.label;
                    list.appendChild(op);
                });
            })
        });
});