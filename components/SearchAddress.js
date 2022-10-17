const address = document.querySelector("#inputAddress");
const list = document.querySelector("#datalistOptions");

address.addEventListener('input', async (e) => {
    e.preventDefault();
    if (e.currentTarget.value.length < 4) return;
    const ad = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${e.currentTarget.value}&limit=5`)
    const res = await ad.json();
    res.features.forEach((f) => {
        const op = document.createElement("option");
        op.setAttribute("value", f.properties.label);
        op.innerHTML = f.properties.label;
        list.appendChild(op);
    });
});